class ShippingFeePolicy {
  private readonly freeShippingThreshold: number;
  private readonly shippingFee: number;

  constructor(freeShippingThreshold: number, shippingFee: number) {
    this.freeShippingThreshold = freeShippingThreshold;
    this.shippingFee = shippingFee;
  }

  calculate(amount: number) {
    if (amount === 0) return 0;
    if (amount >= this.freeShippingThreshold) return 0;
    return this.shippingFee;
  }

  getFreeShippingThreshold() {
    return this.freeShippingThreshold;
  }
}

export default ShippingFeePolicy;
