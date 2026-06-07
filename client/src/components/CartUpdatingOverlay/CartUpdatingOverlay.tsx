import Spinner from "../../commons/Spinner/Spinner";
import { Container } from "./CartUpdatingOverlay.styles";

const CartUpdatingOverlay = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default CartUpdatingOverlay;
