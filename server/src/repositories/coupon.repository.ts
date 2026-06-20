import { CouponEntity } from "../interfaces/coupon.interface.js";

const coupons: CouponEntity[] = [
  {
    id: 1,
    name: "5,000원 할인 쿠폰",
    expiredAt: new Date("2026-11-30"),
    isUsed: false,
    couponType: "FIXED",
    minimumOrderPrice: 100000,
    fixedAmount: 5000,
  },
  {
    id: 2,
    name: "2개 구매 시 1개 무료 쿠폰",
    expiredAt: new Date("2026-05-30"),
    isUsed: false,
    couponType: "BOGO",
  },
  {
    id: 3,
    name: "5만원 이상 구매 시 무료 배송 쿠폰",
    expiredAt: new Date("2026-08-31"),
    isUsed: false,
    couponType: "FREESHIPPING",
    minimumOrderPrice: 50000,
  },
  {
    id: 4,
    name: "미라클모닝 30% 할인 쿠폰",
    expiredAt: new Date("2026-07-31"),
    isUsed: false,
    couponType: "RATE",
    startedAt: "04:00:00",
    endedAt: "07:00:00",
    rateAmount: 30,
  },
];

export function findAll(): CouponEntity[] {
  return [...coupons];
}

export function findById(id: number): CouponEntity | null {
  return coupons.find((coupon) => coupon.id === id) ?? null;
}
