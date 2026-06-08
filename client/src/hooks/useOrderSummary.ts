import {
  calculateShippingFee,
  getFreeShippingThreshold,
} from "../domains/shipping/shipping";
import type { CartItemModel } from "./useCartItems.types";
import type { OrderSummarys } from "./useOrderSummary.types";

const useOrderSummary = (items: CartItemModel[]): OrderSummarys => {
  const selectedItems = items.filter((item) => item.isSelected);
  const itemCount = selectedItems.length;
  const totalQuantity = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingFee = calculateShippingFee(totalPrice);
  const totalAmount = totalPrice + shippingFee;
  const freeShippingThreshold = getFreeShippingThreshold();

  return {
    itemCount,
    totalQuantity,
    totalPrice,
    shippingFee,
    totalAmount,
    freeShippingThreshold,
  };
};

export default useOrderSummary;
