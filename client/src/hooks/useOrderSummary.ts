import type { ShippingFeePolicyInterface } from "../domains/shipping/interface";
import type { CartItemModel } from "./useCartItems.types";
import type { OrderSummarys } from "./useOrderSummary.types";

const useOrderSummary = (
  items: CartItemModel[],
  shippingFeePolicy: ShippingFeePolicyInterface,
): OrderSummarys => {
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
  const shippingFee = shippingFeePolicy.calculate(totalPrice);
  const totalAmount = totalPrice + shippingFee;
  const freeShippingThreshold = shippingFeePolicy.getFreeShippingThreshold();

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
