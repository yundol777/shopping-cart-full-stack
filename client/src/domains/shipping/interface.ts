export interface ShippingFeePolicyInterface {
  calculate(price: number): number;
  getFreeShippingThreshold(): number;
}
