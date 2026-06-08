import useOrderSummary from "../../hooks/useOrderSummary";
import type { CartItemModel } from "../../hooks/useCartItems.types";
import OrderSubmitButton from "../OrderSubmitButton/OrderSubmitButton";
import SummaryItem from "../SummaryItem/SummaryItem";
import {
  Container,
  FreeShippingNotice,
  InfoIcon,
  PriceGroup,
  TotalSection,
} from "./OrderSummary.styles";

interface Props {
  items: CartItemModel[];
}

const OrderSummary = ({ items }: Props) => {
  const {
    itemCount,
    totalQuantity,
    totalPrice,
    shippingFee,
    totalAmount,
    freeShippingThreshold,
  } = useOrderSummary(items);

  return (
    <Container>
      <FreeShippingNotice>
        <InfoIcon>i</InfoIcon>
        <p>
          총 주문 금액이 {freeShippingThreshold.toLocaleString()}원 이상일 경우
          무료 배송됩니다.
        </p>
      </FreeShippingNotice>
      <PriceGroup>
        <SummaryItem label="주문 금액" price={totalPrice} />
        <SummaryItem label="배송비" price={shippingFee} />
      </PriceGroup>
      <TotalSection>
        <SummaryItem label="총 결제 금액" price={totalAmount} />
      </TotalSection>
      <OrderSubmitButton
        itemCount={itemCount}
        totalQuantity={totalQuantity}
        totalAmount={totalAmount}
      />
    </Container>
  );
};

export default OrderSummary;
