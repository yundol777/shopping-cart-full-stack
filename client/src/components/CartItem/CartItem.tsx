import Price from "../../commons/Price/Price";
import SelectionCheckbox from "../../commons/SelectionCheckbox/SelectionCheckbox";
import type {
  CartActions,
  CartItemModel,
} from "../../hooks/useCartItems.types";
import type { UseCartDataReturn } from "../../hooks/useCartData.types";
import {
  Container,
  ControlButton,
  DeleteButton,
  ItemBody,
  ItemImage,
  ItemInfo,
  ItemName,
  ItemPrice,
  QuantityControls,
  TopRow,
} from "./CartItem.styles";

interface Props {
  item: CartItemModel;
  onUpdateQuantity: UseCartDataReturn["updateQuantity"];
  onDeleteItem: CartActions["handleDeleteItem"];
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
    <Container>
      <TopRow>
        <SelectionCheckbox
          id={`cart-item-${item.id}`}
          isChecked={item.isSelected}
          ariaLabel={`${item.name} 선택`}
          onClick={() => onToggleItem(item.id)}
        />
        <DeleteButton type="button" onClick={() => onDeleteItem(item.id)}>
          삭제
        </DeleteButton>
      </TopRow>
      <ItemBody>
        <ItemImage src={item.imageUrl} alt={item.name} />
        <ItemInfo>
          <div>
            <ItemName>{item.name}</ItemName>
            <ItemPrice>
              <Price value={item.price} />
            </ItemPrice>
          </div>
          <QuantityControls>
            <ControlButton type="button" onClick={handleDecreaseClick}>
              -
            </ControlButton>
            <span>{item.quantity}</span>
            <ControlButton type="button" onClick={handleIncreaseClick}>
              +
            </ControlButton>
          </QuantityControls>
        </ItemInfo>
      </ItemBody>
    </Container>
  );
};

export default CartItem;
