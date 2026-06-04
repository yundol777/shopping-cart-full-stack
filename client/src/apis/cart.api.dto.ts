export interface CartItem {
  id: number;
  productId: number;
  name: string;
  quantity: number;
  stock: number;
  imageUrl: string;
  price: number;
}

export type CartItemsResponseDto = CartItem[];

export interface ErrorResponseDto {
  code: string;
  message: string;
}
