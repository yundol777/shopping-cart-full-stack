import Spinner from "../../commons/Spinner/Spinner";
import { Container } from "./CartUpdatingOverlay.styles";

const CartUpdatingOverlay = () => {
  return (
    <Container role="status" aria-label="장바구니 수정 중">
      <Spinner />
    </Container>
  );
};

export default CartUpdatingOverlay;
