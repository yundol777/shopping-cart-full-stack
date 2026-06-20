import request from "supertest";
import app from "../../src/app.js";

describe("GET /coupon", () => {
  it("보유 쿠폰이 없다면, 200 OK와 빈 배열을 반환한다.", async () => {
    const response = await request(app).get("/coupon");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("보유 쿠폰이 있으면, 200 OK와 장바구니 목록을 반환한다.", async () => {
    const response = await request(app).get("/coupon");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
