import { MAX_CART_ITEM_QUANTITY, MIN_CART_ITEM_QUANTITY } from "./constants";

export function isValidCartItemQuantity(quantity: number) {
  return (
    Number.isInteger(quantity) &&
    quantity >= MIN_CART_ITEM_QUANTITY &&
    quantity <= MAX_CART_ITEM_QUANTITY
  );
}
