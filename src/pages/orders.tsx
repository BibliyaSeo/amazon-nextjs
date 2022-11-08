//firebase + scripe

import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import moment from "moment";
import { getSession, useSession } from "next-auth/react";
import db from "../../firebase";
import Header from "../components/Header";
import Order from "../components/Order";

export default function Orders({ orders }: any) {
  const { data: session }: any = useSession();
  console.log(orders);
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>

        {session ? <h2>x Orders</h2> : <h2>Please sign in to see your orders. </h2>}
        <div className="mt-5 space-y-4">
          {/* {[orders]?.map((item, idx) => (
            <Order key={idx} />
          ))} */}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const session: any = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  // const stripeOrders = await db
  //   .collection("users")
  //   .doc(session.user.email)
  //   .collection("orders")
  //   .orderBy("timestamp", "desc")
  //   .get();

  // const orders = await Promise.all(
  //   stripeOrders.docs.map(async (order: any) => ({
  //     id: order.indexOf,
  //     amount: order.data().amount,
  //     amountShipping: order.data().amount_shipping,
  //     images: order.data().images,
  //     timestamp: moment(order.data().timestamp.toDate()).unix(),
  //     items: (
  //       await stripe.checkout.session.listLineItems(order.id, {
  //         limit: 100,
  //       })
  //     ).data,
  //   }))
  // );

  const orderRef = collection(db, "user", session.user.email, "orders");
  const orderQuery = query(orderRef, orderBy("timestamp", "desc"));
  const orderSnap = await getDocs(orderQuery);

  let orders;

  orderSnap.forEach(
    (order) =>
      (orders = {
        id: order.id,
        amount: order.data().amount,
        amountShipping: order.data().amount_shipping,
        images: order.data().images,
        timestamp: moment(order.data().timestamp.toDate()).unix(),
      })
  );

  return {
    props: { orders },
  };
}
