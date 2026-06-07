import { useState } from "react";
import type { CartItemsResponseDto } from "../apis/cart.api.dto";
import type { CartItemModel, UseCartItemsReturn } from "./useCartItems.types";
import {
  getUnselectedItems,
  saveUnselectedItems,
} from "../storage/cart.storage";
import type { UseCartDataReturn } from "./useCartData.types";

interface Props {
  cartItemsList: CartItemsResponseDto;
  deleteItem: UseCartDataReturn["deleteItem"];
}

const useCartItems = ({
  cartItemsList,
  deleteItem,
}: Props): UseCartItemsReturn => {
  const [unselectedItemIds, setUnselectedItemIds] =
    useState(getUnselectedItems);

  const items: CartItemModel[] = cartItemsList.map((cartItem) => ({
    ...cartItem,
    isSelected: !unselectedItemIds.includes(cartItem.id),
  }));

  const handleDeleteItem = async (id: number) => {
    await deleteItem(id);

    setUnselectedItemIds((prevIds) => {
      const nextIds = prevIds.filter((itemId) => itemId !== id);
      saveUnselectedItems(nextIds);
      return nextIds;
    });
  };

  const toggleSelection = (id: number) => {
    setUnselectedItemIds((prevIds) => {
      const nextIds = prevIds.includes(id)
        ? prevIds.filter((itemId) => itemId !== id)
        : [...prevIds, id];

      saveUnselectedItems(nextIds);
      return nextIds;
    });
  };

  const toggleAllSelection = () => {
    setUnselectedItemIds(() => {
      const hasUnselectedItem = items.some((item) => !item.isSelected);
      const nextIds = hasUnselectedItem ? [] : items.map((item) => item.id);

      saveUnselectedItems(nextIds);
      return nextIds;
    });
  };

  const actions = {
    handleDeleteItem,
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
