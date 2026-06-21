import { Request, Response } from "express";
import { fetchOrderItems, fetchOrderSummary } from "../services/order.service.js";
import { COMMON_ERROR_RESPONSE, COUPON_ERROR_RESPONSE } from "../constants/error.js";

export async function getOrderItems(request: Request, response: Response): Promise<void> {
  const { selectedCartItemIds } = request.body;

  if (!Array.isArray(selectedCartItemIds)) throw new Error(COMMON_ERROR_RESPONSE.INVALID_REQUEST_BODY.code);

  const orderItems = await fetchOrderItems(selectedCartItemIds);
  response.status(200).json(orderItems);
}

export async function getOrderSummary(request: Request, response: Response): Promise<void> {
  const { selectedCartItemIds, selectedCouponIds, isRemoteArea } = request.body;

  if (!Array.isArray(selectedCartItemIds) || !Array.isArray(selectedCouponIds) || typeof isRemoteArea !== "boolean")
    throw new Error(COMMON_ERROR_RESPONSE.INVALID_REQUEST_BODY.code);

  if (selectedCouponIds.length > 2) throw new Error(COUPON_ERROR_RESPONSE.EXCEEDS_COUPON_LIMIT.code);

  const orderSummary = await fetchOrderSummary(selectedCartItemIds, selectedCouponIds, isRemoteArea);
  response.status(200).json(orderSummary);
}
