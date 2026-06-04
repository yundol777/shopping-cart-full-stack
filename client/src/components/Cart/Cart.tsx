import type { CartItemsResponseDto } from "../../apis/cart.api.dto";
import useCartItems from "../../hooks/useCartItems";
import type { ShippingFeePolicyInterface } from "../../domains/shipping/interface";
import CartItems from "../CartItems/CartItmes";
import OrderSummary from "../OrderSummary/OrderSummary";

interface Props {
  cartItemsList: CartItemsResponseDto;
  shippingFeePolicy: ShippingFeePolicyInterface;
}

const Cart = ({ cartItemsList, shippingFeePolicy }: Props) => {
  const { items, summary, actions } = useCartItems(
    cartItemsList,
    shippingFeePolicy,
  );

  return (
    <div>
      <p>현재 {items.length}종류의 상품이 담겨있습니다.</p>
      <CartItems
        items={items}
        isAllSelected={summary.isAllSelected}
        onUpdateQuantity={actions.updateQuantity}
        onDeleteItem={actions.deleteItem}
        onToggleItem={actions.toggleSelection}
        onToggleAll={actions.toggleAllSelection}
      />
      <OrderSummary
        totalPrice={summary.totalPrice}
        shippingFee={summary.shippingFee}
        freeShippingThreshold={shippingFeePolicy.getFreeShippingThreshold()}
      />
    </div>
  );
};

export default Cart;
