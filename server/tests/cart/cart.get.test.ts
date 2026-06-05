import request from "supertest";
import app from "../../src/app.js";
import { reset, saveNewItem } from "../../src/repositories/cart.repository.js";
import { reset as resetProducts } from "../../src/repositories/products.repository.js";

const validProduct = {
  name: "콜라",
  stock: 10,
  imageUrl: "https://example.com/images/cola.png",
  price: 1500,
};

describe("GET /cart", () => {
  beforeEach(() => {
    reset();
    resetProducts();
  });

  it("장바구니가 비어있으면 200 OK와 빈 배열을 반환한다.", async () => {
    const response = await request(app).get("/cart");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  it("장바구니에 상품이 있으면 200 OK와 장바구니 목록을 반환한다.", async () => {
    await request(app).post("/products").send(validProduct).expect(201);
    saveNewItem({ productId: 1, quantity: 2 });

    const response = await request(app).get("/cart");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        productId: 1,
        quantity: 2,
        ...validProduct,
      },
    ]);
  });
});
