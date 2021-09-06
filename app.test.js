const { describe } = require("jest-circus");
const request = require("supertest");
const app = require("./app");
describe("Todos API", () => {
  it("GET /users --> array todos", () => {
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
  it("GET /products --> array todos", () => {
    return request(app)
      .get("/api/products")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              size: expect.any(String),
              quantity: expect.any(Number),
              color: expect.arrayContaining([expect.any(String)]),
              reviewsID: expect.arrayContaining([expect.any(String)]),
            }),
          ])
        );
      });
  });
  it("GET /todos/id --> specific todos by ID", () => {});
  it("GET /todos/id --> 404 ì not found", () => {});
  it("POST /todos --> created todo", () => {});
  it("GET /todos --> validates request body", () => {});
});
