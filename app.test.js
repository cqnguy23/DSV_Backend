const { describe } = require("jest-circus");
require("jest-extended");

const request = require("supertest");
const app = require("./app");
describe("Todos API", () => {
  it("GET /users --> array todos", async () => {
    return request(app)
      .get("/api/users")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });
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
      .get("/api/products/:id")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            size: expect.any(String),
            quantity: expect.any(Number),
            color: expect.any(String),
            rating: expect.any(Number),
            reviewsID: expect.arrayContaining([expect.any(String)]),
          })
        );
      });
  });

  it("GET /todos/id --> specific todos by ID", () => {});
  it("GET /todos/id --> 404 if not found", () => {});
  it("POST /todos --> created todo", () => {});
  it("GET /todos --> validates request body", () => {});
});
