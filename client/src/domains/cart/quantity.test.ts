import { describe, expect, it } from "vitest";
import { MAX_CART_ITEM_QUANTITY, MIN_CART_ITEM_QUANTITY } from "./constants";
import { isValidCartItemQuantity } from "./quantity";

describe("장바구니 상품 수량 정책", () => {
  it("최소 수량보다 작으면 유효하지 않다.", () => {
    expect(isValidCartItemQuantity(MIN_CART_ITEM_QUANTITY - 1)).toBe(false);
  });

  it("최소 수량이면 유효하다.", () => {
    expect(isValidCartItemQuantity(MIN_CART_ITEM_QUANTITY)).toBe(true);
  });

  it("최대 수량이면 유효하다.", () => {
    expect(isValidCartItemQuantity(MAX_CART_ITEM_QUANTITY)).toBe(true);
  });

  it("최대 수량보다 크면 유효하지 않다.", () => {
    expect(isValidCartItemQuantity(MAX_CART_ITEM_QUANTITY + 1)).toBe(false);
  });

  it("정수가 아니면 유효하지 않다.", () => {
    expect(isValidCartItemQuantity(1.5)).toBe(false);
  });
});
