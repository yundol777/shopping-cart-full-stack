import { useNavigate } from "react-router";
import type { CartItem } from "../../../apis/cart.api.dto";
import Button from "../../../commons/Button/Button";

interface Props {
  orderItems: CartItem[];
  totalAmount: number;
}

const OrderButton = ({ orderItems, totalAmount }: Props) => {
  const navigate = useNavigate();
  const itemCount = orderItems.length;
  const totalQuantity = orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const moveToCheckout = () => {
    navigate("/complete", {
      state: {
        itemCount,
        totalQuantity,
        totalAmount,
      },
    });
  };

  return <Button label="결제하기" onClick={moveToCheckout} />;
};

export default OrderButton;
