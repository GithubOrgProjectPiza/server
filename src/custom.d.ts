import { authJwt } from "./controller/auth.controller";

declare module "express-serve-static-core" {
  interface Request {
    auth?: authJwt & { isAuthenthicated: boolean };
  }
}
