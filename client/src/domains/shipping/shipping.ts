import { DEFAULT_SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "./constants";

export const calculateShippingFee = (amount: number) => {
  if (amount === 0) return 0;
  if (amount >= FREE_SHIPPING_THRESHOLD) return 0;

  return DEFAULT_SHIPPING_FEE;
};

export const getFreeShippingThreshold = () => FREE_SHIPPING_THRESHOLD;
