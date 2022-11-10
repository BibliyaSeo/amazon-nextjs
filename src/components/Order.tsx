import { iteratorSymbol } from "immer/dist/internal";
import moment from "moment";
import Currency from "react-currency-formatter";

interface OrderProps {
  id: number;
  amount: number;
  amountShipping: number;
  timestamp: number;
  images: string[];
  items: any;
}

export default function Order({
  id,
  amount,
  amountShipping,
  timestamp,
  images,
  items,
}: OrderProps) {
  return (
    <div className="border rounded-md">
      <div className="flex item-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div className="w-1/3">
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("DD MM YYYY")}</p>
        </div>
        <div className="w-1/3">
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <Currency quantity={amount} currency="GBP" /> - Delivery{" "}
            {amountShipping === 0 ? "Free" : <Currency quantity={amountShipping} currency="GBP" />}
          </p>
        </div>
        <div>
          <p className="w-40 lg:w-72 truncate text-xs whitespace-nowrap">ORDER # {id}</p>
          <p
            className="text-sm whitespace-nowrap sm:text-xl self-end 
          flex-1 text-right text-blue-500"
          >
            {items?.data.length} items
          </p>
        </div>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((image, index) => (
            <img key={index} src={image} alt="products" className="h-20 object-contain sm:h-32" />
          ))}
        </div>
      </div>
    </div>
  );
}
