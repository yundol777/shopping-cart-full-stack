const UNSELECTED_CART_ITEM_IDS_KEY = "unselectedCartItemIds";

export function getUnselectedItems(): number[] {
  const value = localStorage.getItem(UNSELECTED_CART_ITEM_IDS_KEY);
  if (value === null) return [];

  return JSON.parse(value);
}

export function saveUnselectedItems(itemIds: number[]) {
  localStorage.setItem(UNSELECTED_CART_ITEM_IDS_KEY, JSON.stringify(itemIds));
}
