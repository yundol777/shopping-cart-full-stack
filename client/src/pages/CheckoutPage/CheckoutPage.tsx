import useCartData from "../../hooks/useCartData";
import { Container, Title } from "./CheckoutPage.styles";

const CheckoutPage = () => {
  useCartData();

  return (
    <Container>
      <Title>주문 확인</Title>
    </Container>
  );
};

export default CheckoutPage;
