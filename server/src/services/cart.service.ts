import { CART_ERROR_RESPONSE, PRODUCT_ERROR_RESPONSE } from "../constants/error.js";
import { CartItem, CartItemResponse } from "../interfaces/cart.interface.js";
import {
  findAll,
  isAlreadyExist,
  deleteById,
  findProductIdById,
  updateItemQuantity,
  deleteByProductId,
} from "../repositories/cart.repository.js";
import { getProductById, getProductStockById } from "./products.service.js";

export async function getCartItems() {
  const cartItems = await findAll();
  return await Promise.all(cartItems.map(createCartItemResponse));
}

async function createCartItemResponse(cartItem: CartItem): Promise<CartItemResponse> {
  const product = await getProductById(cartItem.productId);
  return {
    ...cartItem,
    name: product.name,
    stock: product.stock,
    imageUrl: product.imageUrl,
    price: product.price,
  };
}

export async function updateCartItemQuantity(id: number, quantity: number) {
  const productId = findProductIdById(id);
  if (productId === null) throw new Error(CART_ERROR_RESPONSE.CART_ITEM_NOT_FOUND.code);

  const stock = await getProductStockById(productId);
  if (stock === null) throw new Error(PRODUCT_ERROR_RESPONSE.PRODUCT_NOT_FOUND.code);
  if (quantity > stock) throw new Error(CART_ERROR_RESPONSE.OUT_OF_STOCK.code);

  updateItemQuantity(id, quantity);
}

export async function deleteCartItem(id: number) {
  if (!isAlreadyExist(id)) {
    throw new Error(CART_ERROR_RESPONSE.CART_ITEM_NOT_FOUND.code);
  }
  await deleteById(id);
}

export async function deleteCartItemByProductId(prductId: number) {
  await deleteByProductId(prductId);
}
