import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems } from "../slices/basketSlice";
import Currency from "react-currency-formatter";

export default function Checkout() {
  const items = useSelector(selectItems);
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <div className="w-full flex justify-center">
            <Image
              src={"https://links.papareact.com/ikj"}
              alt=""
              width={1020}
              height={250}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col p-5 space-y-10 bg-white mt-5">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your Amazon Basket is empty." : "Shopping Basket"}
            </h1>
            {items.map((item: any, idx: number) => (
              <CheckoutProduct
                key={idx}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>
        <div>
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):
                <span className="font-bold">
                  {/* <Currency quantity={total} currency="GBP" /> */}
                </span>
              </h2>
              <button></button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
