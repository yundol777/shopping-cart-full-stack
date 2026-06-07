import Spinner from "../../commons/Spinner/Spinner";
import { Container } from "./CartLoading.styles";

const CartLoading = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default CartLoading;
