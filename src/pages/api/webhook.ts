import { buffer } from "micro";
import * as admin from "firebase-admin";

const serviceAccount = require("../../../permissions.json");

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SINGING_SECRET;

const fulfillOrder = async (session: any) => {
  console.log("Fulfilling order", session);
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      id: session.id,
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    // .then(() => {
    //   console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
    // });
};

export default async (req: any, res: any) => {
  if (req.method === "POST") {
    const requsetBuffer = await buffer(req);
    const payload = requsetBuffer.toString();
    const signature = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
    } catch (err: any) {
      // console.log(`Webhook signature verification failed.`, err.message);
      return req.sendStatus(400);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
