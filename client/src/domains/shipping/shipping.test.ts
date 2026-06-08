import { describe, expect, it } from "vitest";
import { DEFAULT_SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "./constants";
import { calculateShippingFee, getFreeShippingThreshold } from "./shipping";

describe("배송비 정책", () => {
  it("주문 금액이 0원이면 배송비를 부과하지 않는다.", () => {
    expect(calculateShippingFee(0)).toBe(0);
  });

  it("무료 배송 기준 미만이면 기본 배송비를 부과한다.", () => {
    expect(calculateShippingFee(FREE_SHIPPING_THRESHOLD - 1)).toBe(
      DEFAULT_SHIPPING_FEE,
    );
  });

  it("무료 배송 기준과 정확히 같으면 배송비를 부과하지 않는다.", () => {
    expect(calculateShippingFee(FREE_SHIPPING_THRESHOLD)).toBe(0);
  });

  it("무료 배송 기준 이상이면 배송비를 부과하지 않는다.", () => {
    expect(calculateShippingFee(FREE_SHIPPING_THRESHOLD + 1)).toBe(0);
  });

  it("무료 배송 기준 금액을 반환한다.", () => {
    expect(getFreeShippingThreshold()).toBe(FREE_SHIPPING_THRESHOLD);
  });
});
