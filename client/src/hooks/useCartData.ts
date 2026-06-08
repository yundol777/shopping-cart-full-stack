import { useEffect, useState } from "react";
import {
  deleteCartItem,
  getCartItems,
  NetworkError,
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
  const [mutationError, setMutationError] = useState<Error | null>(null);
  const [mutationLoading, setMutationLoading] = useState(false);

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

  useEffect(() => {
    if (mutationError === null) return;

    const timerId = setTimeout(() => {
      setMutationError(null);
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [mutationError]);

  const updateQuantity = async (id: number, quantity: number) => {
    if (!isValidCartItemQuantity(quantity)) return;
    try {
      setMutationError(null);
      setMutationLoading(true);
      await updateCartItemQuantity(id, quantity);
      replaceQuantity(id, quantity);
    } catch (error) {
      if (error instanceof Error) setMutationError(error);
      if (error instanceof NetworkError) await refetchCartItems();
    } finally {
      setMutationLoading(false);
    }
  };

  const deleteItem = async (id: number) => {
    const prevCartItems = data;
    try {
      setMutationError(null);
      removeItem(id);
      await deleteCartItem(id);
    } catch (error) {
      setData(prevCartItems);
      if (error instanceof Error) setMutationError(error);
      if (error instanceof NetworkError) await refetchCartItems();
      throw error;
    }
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
