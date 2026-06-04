import type { ShippingFeePolicyInterface } from "../../domains/shipping/interface";
import useOrderSummary from "../../hooks/useOrderSummary";
import type { CartItemModel } from "../../hooks/useCartItems.types";
import SummaryItem from "../SummaryItem/SummaryItem";

interface Props {
  items: CartItemModel[];
  shippingFeePolicy: ShippingFeePolicyInterface;
}

const OrderSummary = ({ items, shippingFeePolicy }: Props) => {
  const { totalPrice, shippingFee, totalAmount, freeShippingThreshold } =
    useOrderSummary(items, shippingFeePolicy);

  return (
    <div>
      <div>
        <img src="" alt="" />
        <p>
          총 주문 금액이 {freeShippingThreshold}원 이상일 경우 무료 배송됩니다.
        </p>
      </div>
      <div>
        <SummaryItem label="주문 금액" price={totalPrice} />
        <SummaryItem label="배송비" price={shippingFee} />
      </div>
      <div>
        <SummaryItem label="총 결제 금액" price={totalAmount} />
      </div>
    </div>
  );
};

export default OrderSummary;
