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

    if (cartItem && quantity) {
      cartItem.quantity = quantity;
    }

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
