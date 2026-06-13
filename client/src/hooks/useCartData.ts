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
import useMutation from "./useMutation";

const useCartData = (): UseCartDataReturn => {
  const [data, setData] = useState<CartItemsResponseDto>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate, mutationLoading, mutationError } = useMutation();

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

  const refetchCartItems = async () => {
    const cartItems = await getCartItems();
    setData(cartItems);
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
        if (error instanceof Error) setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (id: number, quantity: number) => {
    if (!isValidCartItemQuantity(quantity)) return;

    await mutate({
      api: () => updateCartItemQuantity(id, quantity),
      onSuccess: () => replaceQuantity(id, quantity),
      onNetworkError: () => refetchCartItems(),
    });
  };

  const deleteItem = async (id: number) => {
    await mutate({
      api: () => deleteCartItem(id),
      onSuccess: () => removeItem(id),
      onNetworkError: () => refetchCartItems(),
    });
  };

  return {
    data,
    loading,
    error,
    mutationError,
    mutationLoading,
    updateQuantity,
    deleteItem,
  };
};

export default useCartData;
