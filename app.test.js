import { describe } from "jest-circus";
import "jest-extended";

import request from "supertest";
import app from "./app";
describe("Products API", () => {
  it("GET /products --> array of products and number of total products", async () => {
    return request(app)
      .get("/api/products")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            products: expect.arrayContaining([
              expect.objectContaining({
                _id: expect.any(String),
                name: expect.any(String),
                size: expect.any(String),
                quantity: expect.any(Number),
                color: expect.any(String),
              }),
            ]),
            numsTotal: expect.any(Number),
          })
        );
      });
  });

  it("GET single product --> object of selected product", async () => {
    return request(app)
      .get("/api/products/61388a8282a9cc24b4dae7ee")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String),
            size: expect.any(String),
            quantity: expect.any(Number),
            color: expect.any(String),
          })
        );
      });
  });
});
