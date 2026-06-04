import { useEffect, useState } from "react";
import { getCartItems } from "../apis/cart.api";
import type { CartItemsResponseDto } from "../apis/cart.api.dto";
import { delay } from "../utils/delay";

const useCartQuery = () => {
  const [data, setData] = useState<CartItemsResponseDto>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCartItems() {
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
    }

    fetchCartItems();
  }, []);

  return { data, loading, error };
};

export default useCartQuery;
