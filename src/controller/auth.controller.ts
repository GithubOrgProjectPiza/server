import express from "express";
import { Request, Response } from "express";
import prisma from "../lib/prisma.lib";
import { Role, Status } from "@prisma/client";
import { createDefaultError, createDefaultSucces } from "../lib/standardResponse";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { emailClient } from "../lib/redis.lib";
import { nanoid } from "nanoid";
import { verificationMail } from "../lib/mail";

const JWT_SECRET = process.env.jwtsecret || "secret";

interface registerBody {
  name: string;
  password: string;
  role: string;
  organization?: number;
}

export interface authJwt {
  id: number;
  role: string;
}

const ROLES: readonly string[] = [Role.ADMIN, Role.USER];

export const register = async (req: Request, res: Response) => {
  const { name, password, role, organization } = req.body || {};

  if (
    !(
      typeof name === "string" &&
      typeof password === "string" &&
      ROLES.includes(role) &&
      typeof organization === "number"
    )
  ) {
    return res.status(400).json(
      createDefaultError("Request body does not match required parameters", {
        name: "string",
        password: "string",
        organization: "int",
      })
    );
  }

  const hash = await argon2.hash("salty" + password + "salty",{
    type: argon2.argon2id
  });

  if (!(await prisma.organization.findUnique({ where: { id: organization } }))) {
    return res.status(404).json(createDefaultError(`Could not find organization with id ${organization}`, {}));
  }

  if (role ? ("USER" as Role) === Role.ADMIN : Role) {
    if (req.auth?.role !== Role.ADMIN) {
      return res.status(401).json(createDefaultError(`Unauthorized`, {}));
    }
  }

  const user = await prisma.user.create({
    data: {
      email: name,
      passwordSalt: "salty",
      passwordHash: hash,
      role: role as Role,
      status: role === Role.ADMIN ? Status.UNVERIFIED : Status.ENABLED,
      organization: { connect: { id: organization } || undefined },
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  const usid = nanoid();

  (await emailClient).set(usid, user.id);

  verificationMail(name, usid);

  res.status(201).json(createDefaultSucces("User created succesfully", user));
};

export const authenthicate = async (req: Request, res: Response) => {
  const { name, password } = req.body || {};

  if (!(typeof name === "string" && typeof password === "string")) {
    return res.status(400).json(
      createDefaultError("Request body does not match required parameters", {
        name: "string",
        password: "string",
      })
    );
  }

  const hash = await argon2.hash("salty" + password + "salty",{
    type: argon2.argon2id
  });

  const user = await prisma.user.findUnique({ where: { email: name } });

  if (!user) {
    return res.status(403).json(createDefaultError("Username or Password wrong", {}));
  }

  if (await argon2.verify(user.passwordHash,hash)) {
    return res.status(403).json(createDefaultError("Username or Password wrong", {}));
  }

  const userjwt: authJwt = {
    id: user.id,
    role: user.role,
  };

  req.headers.authorization = jwt.sign(userjwt, JWT_SECRET);

  res.status(200).json(createDefaultSucces("Logged in succesfully",{}))
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { code } = req.body || {};

  if (!(typeof code === "string")) {
    return res.status(400).json(
      createDefaultError("Request body does not match required parameters", {
        code: "string",
      })
    );
  }

  const acc: number | undefined = emailClient.get(code);

  if (!acc) {
    return res.status(404).json(createDefaultError("The code is invalid", {}));
  }

  const user = prisma.user.update({
    where: {
      id: acc,
    },
    data: {
      status: Status.VERIFIED,
    },
  });
};
