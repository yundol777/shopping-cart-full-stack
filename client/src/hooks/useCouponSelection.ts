import { useEffect, useRef, useState } from "react";
import type { CouponResponse } from "../apis/coupon.api.dto";
import { getSelectedCouponIds } from "../storage/order.storage";
import { calculateTotalCouponDiscount } from "../../../server/src/domain/coupon/coupon.discount";

export function useCouponSelection(
  coupons: CouponResponse[],
  totalPrice: number,
  bestCombination: number[],
) {
  const [selectedCouponIds, setSelectedCouponIds] = useState<number[]>([]);

  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    const persisted = getSelectedCouponIds();

    if (persisted && persisted.length > 0) {
      setSelectedCouponIds(persisted);
      initializedRef.current = true;
      return;
    }

    if (bestCombination.length > 0) {
      setSelectedCouponIds(bestCombination);
      initializedRef.current = true;
      return;
    }
  }, [bestCombination]);

  const toggleCoupon = (couponId: number, isUsable = true) => {
    if (!isUsable) return;
    setSelectedCouponIds((prev) => {
      if (prev.includes(couponId)) {
        const next = prev.filter((id) => id !== couponId);
        return next;
      }

      if (prev.length >= 2) {
        return prev;
      }

      const next = [...prev, couponId];
      return next;
    });
  };

  const selectedCoupons = coupons.filter((c) =>
    selectedCouponIds.includes(c.id),
  );

  const totalDiscount = calculateTotalCouponDiscount(
    selectedCoupons,
    totalPrice,
  );

  return {
    selectedCouponIds,
    toggleCoupon,
    selectedCoupons,
    totalDiscount,
  };
}
