import Image from "next/image";
import { HiOutlineSearch, HiOutlineShoppingCart, HiOutlineMenu } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

export default function Header() {
  const { data: session }: any = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header>
      {/* top */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 mx-6">
          <Image
            onClick={() => router.push("/")}
            src={"https://links.papareact.com/f90"}
            width={150}
            height={40}
            alt={"logo"}
            className="object-contain cursor-pointer"
          />
        </div>
        <div
          className="hidden sm:flex items-center h-10 rounded-md
           flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500"
        >
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink 
            rounded-l-md focus: outline-none px-4"
            type={"text"}
          />
          <HiOutlineSearch className="text-4xl p-2 w-12" />
        </div>
        <div
          className=" text-white flex items-center text-xs 
          space-x-6 mx-6 whitespace-nowrap"
        >
          <div className="link" onClick={!session ? () => signIn() : () => signOut()}>
            <p>{session ? `Hello, ${session.user.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div className="relative flex items-center link" onClick={() => router.push("/checkout")}>
            <span
              className="absolute top-0 right-0 md:right-10 
              h-4 w-5 bg-yellow-400 text-center rounded-full 
              text-black font-bold"
            >
              {items.length}
            </span>
            <HiOutlineShoppingCart className="text-4xl" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
          </div>
        </div>
      </div>
      {/* bottom */}
      <div
        className="flex items-center bg-amazon_blue-light 
        text-white text-sm p-2 pl-6 space-x-3"
      >
        <p className="link flex items-center">
          <HiOutlineMenu className="h-6 mr-1 text-xl" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deal</p>
        <p className="link hidden lg:inline-flex">Electronies</p>
      </div>
    </header>
  );
}
