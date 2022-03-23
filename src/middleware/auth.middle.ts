import { NextFunction, Request, Response } from "express";
import { createDefaultError } from "../lib/standardResponse";
import jwt, { JwtPayload } from "jsonwebtoken";
import { authJwt } from "../controller/auth.controller";
import prisma from "../lib/prisma.lib";

const verifyAuthorizationFormat = (authorization: string) => /^Bearer .+$/.test(authorization);

const getBearerToken = (authorization: string) => authorization.slice(7);

const JWT_SECRET = process.env.jwtsecret || "secret";

export const requireAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json(createDefaultError("The request did not contain a authorization header", null));
  }

  if (!verifyAuthorizationFormat(authorization)) {
    return res.status(400).json(createDefaultError("Malformed Bearer Token", { format: "Bearer <token>" }));
  }

  let payload_: string | JwtPayload;

  try {
    payload_ = jwt.verify(getBearerToken(authorization), JWT_SECRET);
  } catch (e) {
    return res.status(403).json(createDefaultError("The Token could not be verified, it might be expiered", null));
  }

  const payload = payload_ as authJwt;

  const { id } = payload;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      role: true,
    },
  });

  req.auth = {
    isAuthenthicated: true,
    id,
    role: user?.role || "user",
  };

  next();
};
