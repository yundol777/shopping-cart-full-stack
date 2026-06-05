import { useNavigate } from "react-router";
import Button from "../../commons/Button/Button";

interface Props {
  itemCount: number;
  totalQuantity: number;
  totalAmount: number;
}

const OrderSubmitButton = ({
  itemCount,
  totalQuantity,
  totalAmount,
}: Props) => {
  const navigate = useNavigate();

  const moveToCheckout = () => {
    navigate("/checkout", {
      state: {
        itemCount,
        totalQuantity,
        totalAmount,
      },
    });
  };

  return (
    <Button
      label="주문 확인"
      onClick={moveToCheckout}
      disabled={itemCount === 0}
    />
  );
};

export default OrderSubmitButton;
