import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { CartItemsResponseDto } from "../apis/cart.api.dto";
import useCartItems from "./useCartItems";

const UNSELECTED_CART_ITEM_IDS_KEY = "unselectedCartItemIds";

const cartItems: CartItemsResponseDto = [
  {
    id: 1,
    productId: 10,
    name: "나이키",
    quantity: 1,
    stock: 10,
    imageUrl: "https://example.com/nike.png",
    price: 60000,
  },
  {
    id: 2,
    productId: 11,
    name: "아디다스",
    quantity: 1,
    stock: 5,
    imageUrl: "https://example.com/adidas.png",
    price: 30000,
  },
];

describe("useCartItems", () => {
  it("삭제 성공 시 선택 해제 상태에서 삭제된 상품 id를 제거한다.", async () => {
    localStorage.setItem(UNSELECTED_CART_ITEM_IDS_KEY, "[1,2]");
    const deleteItem = vi
      .fn<() => Promise<void>>()
      .mockResolvedValue(undefined);

    const { result } = renderHook(() =>
      useCartItems({
        cartItemsList: cartItems,
        deleteItem,
      }),
    );

    await act(async () => {
      await result.current.actions.handleDeleteItem(1);
    });

    expect(localStorage.getItem(UNSELECTED_CART_ITEM_IDS_KEY)).toBe("[2]");
  });
});
