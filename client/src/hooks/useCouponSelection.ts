import { useEffect, useRef, useState } from "react";
import type { CouponResponse } from "../apis/coupon.api.dto";
import { getSelectedCouponIds } from "../storage/order.storage";

function calculateTotalCouponDiscount(
  coupons: CouponResponse[],
  totalPrice: number,
) {
  const sortedCoupons = [...coupons].sort((a, b) => {
    if (a.discountType === "RATE") return 1;
    if (b.discountType === "RATE") return -1;
    return 0;
  });

  let calculatedDiscount = 0;
  let totalAmount = totalPrice;

  for (const coupon of sortedCoupons) {
    if (coupon.discountType === "FIXED") {
      const fixedDiscount = coupon.discountValue;
      calculatedDiscount += fixedDiscount;
      totalAmount -= fixedDiscount;
    }

    if (coupon.discountType === "SHIPPING") {
      const shippingDiscount = coupon.discountValue;
      calculatedDiscount += shippingDiscount;
    }

    if (coupon.discountType === "RATE") {
      const rateDiscount = Math.floor(
        totalAmount * (coupon.discountValue / 100),
      );

      calculatedDiscount += rateDiscount;
      totalAmount -= rateDiscount;
    }
  }

  return calculatedDiscount;
}

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
    }
  }, [bestCombination]);

  const toggleCoupon = (couponId: number, isUsable = true) => {
    if (!isUsable) return;

    setSelectedCouponIds((prev) => {
      if (prev.includes(couponId)) {
        return prev.filter((id) => id !== couponId);
      }

      if (prev.length >= 2) {
        return prev;
      }

      return [...prev, couponId];
    });
  };

  const selectedCoupons = coupons.filter((coupon) =>
    selectedCouponIds.includes(coupon.id),
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
