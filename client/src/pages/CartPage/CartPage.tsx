import useCartQuery from "../../hooks/useCartQuery";
import ShippingFeePolicy from "../../domains/shipping/model";
import {
  DEFAULT_SHIPPING_FEE,
  FREE_SHIPPING_THRESHOLD,
} from "../../domains/shipping/constants";
import CartContent from "./CartContent";
import { Container, Title } from "./CartPage.styles";

const shippingFeePolicy = new ShippingFeePolicy(
  FREE_SHIPPING_THRESHOLD,
  DEFAULT_SHIPPING_FEE,
);

const CartPage = () => {
  const { data, loading, error } = useCartQuery();

  return (
    <Container>
      <Title>장바구니</Title>
      <CartContent
        data={data}
        loading={loading}
        error={error}
        shippingFeePolicy={shippingFeePolicy}
      />
    </Container>
  );
};

export default CartPage;
