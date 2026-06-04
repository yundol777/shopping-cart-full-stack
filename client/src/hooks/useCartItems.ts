import { useState } from "react";
import type { CartItemsResponseDto } from "../apis/cart.api.dto";
import type { CartItemModel, UseCartItemsReturn } from "./useCartItems.types";
import { deleteCartItem, updateCartItemQuantity } from "../apis/cart.api";
import { isValidCartItemQuantity } from "../domains/cart/quantity";
import {
  getUnselectedItems,
  saveUnselectedItems,
} from "../storage/cart.storage";

const createCartItems = (
  cartItemsList: CartItemsResponseDto,
): CartItemModel[] => {
  const unselectedItemIds = getUnselectedItems();

  return cartItemsList.map((cartItem) => ({
    ...cartItem,
    isSelected: !unselectedItemIds.includes(cartItem.id),
  }));
};

const getUnselectedItemIds = (items: CartItemModel[]) => {
  return items.filter((item) => !item.isSelected).map((item) => item.id);
};

const useCartItems = (
  cartItemsList: CartItemsResponseDto,
): UseCartItemsReturn => {
  const [items, setItems] = useState(() => createCartItems(cartItemsList));

  const updateQuantity = async (id: number, quantity: number) => {
    if (!isValidCartItemQuantity(quantity)) return;

    await updateCartItemQuantity(id, quantity);

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          quantity,
        };
      }),
    );
  };

  const deleteItem = async (id: number) => {
    await deleteCartItem(id);

    setItems((prevItems) => {
      const nextItems = prevItems.filter((item) => item.id !== id);
      saveUnselectedItems(getUnselectedItemIds(nextItems));

      return nextItems;
    });
  };

  const toggleSelection = (id: number) => {
    setItems((prevItems) => {
      const nextItems = prevItems.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          isSelected: !item.isSelected,
        };
      });

      saveUnselectedItems(getUnselectedItemIds(nextItems));

      return nextItems;
    });
  };

  const toggleAllSelection = () => {
    setItems((prevItems) => {
      const hasUnselectedItem = prevItems.some((item) => !item.isSelected);

      const nextItems = prevItems.map((item) => ({
        ...item,
        isSelected: hasUnselectedItem,
      }));

      saveUnselectedItems(getUnselectedItemIds(nextItems));

      return nextItems;
    });
  };

  const actions = {
    updateQuantity,
    deleteItem,
    toggleSelection,
    toggleAllSelection,
  };

  const isAllSelected = items.every((item) => item.isSelected);

  return {
    items,
    isAllSelected,
    actions,
  };
};

export default useCartItems;
