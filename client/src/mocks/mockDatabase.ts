export interface MockCartItem {
  id: number;
  productId: number;
  name: string;
  quantity: number;
  stock: number;
  imageUrl: string;
  price: number;
}

export const cartItems: MockCartItem[] = [
  {
    id: 1,
    productId: 10,
    name: "콜라",
    quantity: 2,
    stock: 10,
    imageUrl: "https://picsum.photos/seed/cola/240/240",
    price: 1500,
  },
  {
    id: 2,
    productId: 11,
    name: "사이다",
    quantity: 1,
    stock: 5,
    imageUrl: "https://picsum.photos/seed/cider/240/240",
    price: 1400,
  },
];
