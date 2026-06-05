import type { CartItemsResponseDto } from "../../apis/cart.api.dto";
import useCartItems from "../../hooks/useCartItems";
import type { ShippingFeePolicyInterface } from "../../domains/shipping/interface";
import CartItems from "../CartItems/CartItmes";
import OrderSummary from "../OrderSummary/OrderSummary";
import { Container, Description } from "./Cart.styles";

interface Props {
  cartItemsList: CartItemsResponseDto;
  shippingFeePolicy: ShippingFeePolicyInterface;
}

const Cart = ({ cartItemsList, shippingFeePolicy }: Props) => {
  const { items, isAllSelected, actions } = useCartItems(cartItemsList);

  return (
    <Container>
      <Description>현재 {items.length}종류의 상품이 담겨있습니다.</Description>
      <CartItems
        items={items}
        isAllSelected={isAllSelected}
        onUpdateQuantity={actions.updateQuantity}
        onDeleteItem={actions.deleteItem}
        onToggleItem={actions.toggleSelection}
        onToggleAll={actions.toggleAllSelection}
      />
      <OrderSummary items={items} shippingFeePolicy={shippingFeePolicy} />
    </Container>
  );
};

export default Cart;
