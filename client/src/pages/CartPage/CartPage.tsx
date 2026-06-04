import Cart from "../../components/Cart/Cart";
import CartEmpty from "../../components/CartEmpty/CartEmpty";
import CartError from "../../components/CartError/CartError";
import CartLoading from "../../components/CartLoading/CartLoading";
import useCartQuery from "../../hooks/useCartQuery";
import ShippingFeePolicy from "../../domains/shipping/model";
import {
  DEFAULT_SHIPPING_FEE,
  FREE_SHIPPING_THRESHOLD,
} from "../../domains/shipping/constants";

const shippingFeePolicy = new ShippingFeePolicy(
  FREE_SHIPPING_THRESHOLD,
  DEFAULT_SHIPPING_FEE,
);

const CartPage = () => {
  const { data, loading, error } = useCartQuery();

  const isEmpty = data.length === 0;

  if (loading) return <CartLoading />;
  if (error) return <CartError error={error.message} />;
  if (isEmpty) return <CartEmpty />;

  return <Cart cartItemsList={data} shippingFeePolicy={shippingFeePolicy} />;
};

export default CartPage;
