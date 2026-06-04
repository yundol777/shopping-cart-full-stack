import type { CartItemsResponseDto, ErrorResponseDto } from "./cart.api.dto";

export async function getCartItems(): Promise<CartItemsResponseDto> {
  const response = await fetch("/cart");
  if (!response.ok) {
    const error: ErrorResponseDto = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

export async function updateCartItemQuantity(
  id: number,
  quantity: number,
): Promise<void> {
  const response = await fetch(`/cart/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    const error: ErrorResponseDto = await response.json();
    throw new Error(error.message);
  }
}

export async function deleteCartItem(id: number): Promise<void> {
  const response = await fetch(`/cart/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error: ErrorResponseDto = await response.json();
    throw new Error(error.message);
  }
}
