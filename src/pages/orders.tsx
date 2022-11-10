import { collection, getDocs, orderBy, query } from "firebase/firestore";
import moment from "moment";
import { getSession, useSession } from "next-auth/react";
import db from "../../firebase";
import Header from "../components/Header";
import Order from "../components/Order";

export default function Orders({ orders }: any) {
  const { data: session }: any = useSession();
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>

        {session ? (
          <h2>{orders.length === 1 ? `${orders.length} Order` : `${orders.length} Orders`}</h2>
        ) : (
          <h2>Please sign in to see your orders. </h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map((item: any) => (
            <Order
              key={item.id}
              id={item.id}
              amount={item.amount}
              amountShipping={item.amountShipping}
              timestamp={item.timestamp}
              images={item.images}
              items={item.items}
            />
          ))}
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

  const orderRef = collection(db, "users", session.user.email, "orders");
  const orderQuery = query(orderRef, orderBy("timestamp", "desc"));
  const orderSnap = await getDocs(orderQuery);

  const ordersArray = orderSnap.docs.map((item) => item.data());

  const orders = await Promise.all(
    ordersArray.map(async (order, index) => ({
      id: order.id,
      amount: order.amount,
      amountShipping: order.amount_shipping,
      images: order.images,
      timestamp: moment(order.timestamp.toDate()).unix(),
      items: await stripe.checkout.sessions.listLineItems(order.id, {
        limit: 100,
      }),
    }))
  );

  return {
    props: { orders },
  };
}
