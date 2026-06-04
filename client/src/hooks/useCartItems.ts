import { useState } from "react";
import type { CartItemsResponseDto } from "../apis/cart.api.dto";
import type { CartItemModel, UseCartItemsReturn } from "./useCartItems.types";
import { deleteCartItem, updateCartItemQuantity } from "../apis/cart.api";
import type { ShippingFeePolicyInterface } from "../domains/shipping/interface";
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
  shippingFeePolicy: ShippingFeePolicyInterface,
): UseCartItemsReturn => {
  const [items, setItems] = useState(() => createCartItems(cartItemsList));

  const updateQuantity = async (id: number, quantity: number) => {
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
  const selectedItems = items.filter((item) => item.isSelected);
  const itemCount = selectedItems.length;
  const totalQuantity = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingFee = shippingFeePolicy.calculate(totalPrice);

  const summary = {
    isAllSelected,
    itemCount,
    totalQuantity,
    totalPrice,
    shippingFee,
  };

  return {
    items,
    summary,
    actions,
  };
};

export default useCartItems;
