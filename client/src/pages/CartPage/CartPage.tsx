import ShippingFeePolicy from "../../domains/shipping/model";
import {
  DEFAULT_SHIPPING_FEE,
  FREE_SHIPPING_THRESHOLD,
} from "../../domains/shipping/constants";
import Cart from "../../components/Cart/Cart";
import CartEmpty from "../../components/CartEmpty/CartEmpty";
import CartError from "../../components/CartError/CartError";
import CartLoading from "../../components/CartLoading/CartLoading";
import { Container, Title } from "./CartPage.styles";
import useCartData from "../../hooks/useCartData";
import CartUpdatingOverlay from "../../components/CartUpdatingOverlay/CartUpdatingOverlay";
import Toast from "../../commons/Toast/Toast";

const shippingFeePolicy = new ShippingFeePolicy(
  FREE_SHIPPING_THRESHOLD,
  DEFAULT_SHIPPING_FEE,
);

const CartPage = () => {
  const {
    data,
    loading,
    error,
    mutationError,
    mutationLoading,
    updateQuantity,
    deleteItem,
  } = useCartData();

  let content = (
    <Cart
      cartItemsList={data}
      shippingFeePolicy={shippingFeePolicy}
      updateQuantity={updateQuantity}
      deleteItem={deleteItem}
    />
  );

  if (loading) content = <CartLoading />;
  else if (error) content = <CartError error={error.message} />;
  else if (data.length === 0) content = <CartEmpty />;

  return (
    <Container>
      <Title>장바구니</Title>
      {content}
      {mutationLoading && <CartUpdatingOverlay />}
      {mutationError && <Toast message={mutationError.message} />}
    </Container>
  );
};

export default CartPage;
