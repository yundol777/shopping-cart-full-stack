import type { CartItemsResponseDto } from "../../apis/cart.api.dto";
import Cart from "../../components/Cart/Cart";
import CartEmpty from "../../components/CartEmpty/CartEmpty";
import CartError from "../../components/CartError/CartError";
import CartLoading from "../../components/CartLoading/CartLoading";
import type { ShippingFeePolicyInterface } from "../../domains/shipping/interface";

interface Props {
  data: CartItemsResponseDto;
  loading: boolean;
  error: Error | null;
  shippingFeePolicy: ShippingFeePolicyInterface;
}

const CartContent = ({ data, loading, error, shippingFeePolicy }: Props) => {
  const isEmpty = data.length === 0;

  if (loading) return <CartLoading />;
  if (error) return <CartError error={error.message} />;
  if (isEmpty) return <CartEmpty />;

  return <Cart cartItemsList={data} shippingFeePolicy={shippingFeePolicy} />;
};

export default CartContent;
