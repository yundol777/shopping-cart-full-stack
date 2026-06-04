import SelectionCheckbox from "../../commons/SelectionCheckbox/SelectionCheckbox";
import CartItem from "../CartItem/CartItem";
import type {
  CartActions,
  CartItemModel,
} from "../../hooks/useCartItems.types";

interface Props {
  items: CartItemModel[];
  onUpdateQuantity: CartActions["updateQuantity"];
  onDeleteItem: CartActions["deleteItem"];
  onToggleItem: CartActions["toggleSelection"];
  onToggleAll: CartActions["toggleAllSelection"];
  isAllSelected: boolean;
}

const CartItems = ({
  items,
  onUpdateQuantity,
  onDeleteItem,
  onToggleItem,
  onToggleAll,
  isAllSelected,
}: Props) => {
  return (
    <div>
      <div>
        <SelectionCheckbox
          id="select-all"
          isChecked={isAllSelected}
          onClick={onToggleAll}
        />
        <label htmlFor="select-all">전체선택</label>
      </div>
      <hr />
      <div>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </div>
    </div>
  );
};

export default CartItems;
