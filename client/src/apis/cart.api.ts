import type { CartItemsResponseDto, ErrorResponseDto } from "./cart.api.dto";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function createApiUrl(path: string) {
  if (API_BASE_URL === "") return path;

  return `${API_BASE_URL}${path}`;
}

export async function getCartItems(): Promise<CartItemsResponseDto> {
  const response = await fetch(createApiUrl("/cart"));
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
  const response = await fetch(createApiUrl(`/cart/${id}`), {
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
  const response = await fetch(createApiUrl(`/cart/${id}`), {
    method: "DELETE",
  });

  if (!response.ok) {
    const error: ErrorResponseDto = await response.json();
    throw new Error(error.message);
  }
}
