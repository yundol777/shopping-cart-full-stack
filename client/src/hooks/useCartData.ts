import { useEffect, useState } from "react";
import {
  deleteCartItem,
  getCartItems,
  updateCartItemQuantity,
} from "../apis/cart.api";
import type { CartItemsResponseDto } from "../apis/cart.api.dto";
import { delay } from "../utils/delay";
import { isValidCartItemQuantity } from "../domains/cart/quantity";
import type { UseCartDataReturn } from "./useCartData.types";

const useCartData = (): UseCartDataReturn => {
  const [data, setData] = useState<CartItemsResponseDto>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const replaceQuantity = (id: number, quantity: number) => {
    setData((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          quantity,
        };
      }),
    );
  };

  const removeItem = (id: number) => {
    setData((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        setError(null);

        await delay(500);
        const cartItems = await getCartItems();
        setData(cartItems);
      } catch (error) {
        setError(error instanceof Error ? error : new Error("네트워크 에러"));
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (id: number, quantity: number) => {
    if (!isValidCartItemQuantity(quantity)) return;

    try {
      await updateCartItemQuantity(id, quantity);
      replaceQuantity(id, quantity);
    } catch (error) {
      if (error instanceof Error) {
        alert(error);
      }
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await deleteCartItem(id);
      removeItem(id);
    } catch (error) {
      if (error instanceof Error) {
        alert(error);
      }
    }
  };

  return { data, loading, error, updateQuantity, deleteItem };
};

export default useCartData;
