import Header from "../components/Header";
import { HiCheckCircle } from "react-icons/hi";
import { useRouter } from "next/router";

export default function Success() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <main className="max-w-screen-lg mx-auto mt-10">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <HiCheckCircle className="text-green-500 h-10 text-3xl" />
            <h1 className="text-3xl">Thank you, your order has been confirmed!</h1>
          </div>
          <p>
            Thank you for shopping with us. We'll send a confirmation once your item has shipped, if
            you would like to check the status of order(s) please press the link below.
          </p>
          <button onClick={() => router.push("/orders")} className="button mt-8">
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
}
