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
    <div className="relative border rounded-md">
      <div className="flex item-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("DD MM YYYY")}</p>
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <Currency quantity={amount} currency="GBP" /> - Delivery{" "}
            {amountShipping === 0 ? "Free" : <Currency quantity={amountShipping} currency="GBP" />}
          </p>
        </div>
        <p
          className="text-sm whitespace-nowrap sm:text-xl self-end 
          flex-1 text-right text-blue-500"
        >
          {items?.length}
        </p>
      </div>
    </div>
  );
}
