import useCartItems from "../../hooks/useCartItems";
import type { ShippingFeePolicyInterface } from "../../domains/shipping/interface";
import CartItems from "../CartItems/CartItmes";
import OrderSummary from "../OrderSummary/OrderSummary";
import { Container, Description } from "./Cart.styles";
import type { UseCartDataReturn } from "../../hooks/useCartData.types";

interface Props {
  cartItemsList: UseCartDataReturn["data"];
  shippingFeePolicy: ShippingFeePolicyInterface;
  updateQuantity: UseCartDataReturn["updateQuantity"];
  deleteItem: UseCartDataReturn["deleteItem"];
}

const Cart = ({
  cartItemsList,
  shippingFeePolicy,
  updateQuantity,
  deleteItem,
}: Props) => {
  const { items, isAllSelected, actions } = useCartItems({
    cartItemsList,
    deleteItem,
  });

  return (
    <Container>
      <Description>현재 {items.length}종류의 상품이 담겨있습니다.</Description>
      <CartItems
        items={items}
        isAllSelected={isAllSelected}
        onUpdateQuantity={updateQuantity}
        onDeleteItem={actions.handleDeleteItem}
        onToggleItem={actions.toggleSelection}
        onToggleAll={actions.toggleAllSelection}
      />
      <OrderSummary items={items} shippingFeePolicy={shippingFeePolicy} />
    </Container>
  );
};

export default Cart;
