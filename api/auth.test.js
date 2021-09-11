import { describe } from "jest-circus";
import("jest-extended");
import bcrypt from "bcrypt";
import request from "supertest";
import app from "../app.js";
import User from "../models/User.model.js";
describe("auth API", () => {
  it("POST register --> saved to database and return access token", async () => {
    const email = "chuong125";
    const res = await request(app).post("/api/auth/register").send({
      email: email,
      password: "123",
      name: "Chuong",
    });
    const user = await User.findOne({ email: email });
    expect(user.name).toBeTruthy();
    expect(user.email).toBeTruthy();
    expect(res.body.accessToken).toBeTruthy();
  });

  it("POST login --> successful login return access token", async () => {
    const email = "chuong21233";
    const res = await request(app).post("/api/auth/login").send({
      email: email,
      password: "3123",
    });
    expect(res.body.accessToken).toBeTruthy();
  });
});
