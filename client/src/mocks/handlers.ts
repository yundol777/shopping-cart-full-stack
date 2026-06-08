import { http, HttpResponse } from "msw";
import { cartItems } from "./mockDatabase";

export const handlers = [
  http.get("/cart", () => {
    return HttpResponse.json(cartItems);
  }),

  http.patch("/cart/:id", async ({ params, request }) => {
    const id = Number(params.id);
    const cartItem = cartItems.find((item) => item.id === id);
    const { quantity } = (await request.json()) as { quantity?: number };

    if (!cartItem) {
      return HttpResponse.json(
        {
          code: "CART_ITEM_NOT_FOUND",
          message: "장바구니 상품을 찾을 수 없습니다.",
        },
        { status: 404 },
      );
    }

    if (quantity && quantity > cartItem.stock) {
      return HttpResponse.json(
        {
          code: "OUT_OF_STOCK",
          message: "요청한 수량이 현재 재고보다 많습니다.",
        },
        { status: 409 },
      );
    }

    if (quantity) cartItem.quantity = quantity;

    return new HttpResponse(null, { status: 204 });
  }),

  http.delete("/cart/:id", ({ params }) => {
    const id = Number(params.id);
    const index = cartItems.findIndex((item) => item.id === id);

    if (index !== -1) {
      cartItems.splice(index, 1);
    }

    return new HttpResponse(null, { status: 204 });
  }),
];
