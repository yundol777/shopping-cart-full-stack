import { useState } from "react";
import {
  getSelectedCouponIds,
  saveSelectedCouponIds,
} from "../storage/order.storage";

export function useSelectedCoupons() {
  const [selectedCouponIds, setSelectedCouponIds] = useState<number[]>(() =>
    getSelectedCouponIds(),
  );

  const handleToggleCoupon = (couponId: number, isUsable: boolean) => {
    if (!isUsable) return;

    setSelectedCouponIds((prev) => {
      const selected = prev.includes(couponId);

      if (selected) {
        const next = prev.filter((id) => id !== couponId);
        saveSelectedCouponIds(next);
        return next;
      }

      if (prev.length >= 2) {
        return prev;
      }

      const next = [...prev, couponId];
      saveSelectedCouponIds(next);
      return next;
    });
  };

  return { selectedCouponIds, handleToggleCoupon };
}
