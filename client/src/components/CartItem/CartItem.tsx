import Price from "../../commons/Price/Price";
import SelectionCheckbox from "../../commons/SelectionCheckbox/SelectionCheckbox";
import type {
  CartActions,
  CartItemModel,
} from "../../hooks/useCartItems.types";

interface Props {
  item: CartItemModel;
  onUpdateQuantity: CartActions["updateQuantity"];
  onDeleteItem: CartActions["deleteItem"];
  onToggleItem: CartActions["toggleSelection"];
}

const CartItem = ({
  item,
  onUpdateQuantity,
  onDeleteItem,
  onToggleItem,
}: Props) => {
  const handleDecreaseClick = () => {
    onUpdateQuantity(item.id, item.quantity - 1);
  };

  const handleIncreaseClick = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div>
      <div>
        <SelectionCheckbox
          id={`cart-item-${item.id}`}
          isChecked={item.isSelected}
          onClick={() => onToggleItem(item.id)}
        />
        <button type="button" onClick={() => onDeleteItem(item.id)}>
          삭제
        </button>{" "}
      </div>
      <div>
        <img src={item.imageUrl} alt={item.name} />
        <div>
          <div>
            <p>{item.name}</p>
            <Price value={item.price} />
          </div>
          <button type="button" onClick={handleDecreaseClick}>
            -
          </button>
          <span>{item.quantity}</span>
          <button type="button" onClick={handleIncreaseClick}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
