import express from "express";
import { Request, Response } from "express";
import prisma from "../lib/prisma.lib";
import { Role } from "@prisma/client";
import { createDefaultError, createDefaultSucces } from "../lib/standardResponse";
import argon2 from "argon2";

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

  console.log(name);

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
        role: "USER | ADMIN",
        organization: "int",
      })
    );
  }

  const hash = await argon2.hash("salty" + password + "salty");

  if (!(await prisma.organization.findUnique({ where: { id: organization } }))) {
    return res.status(404).json(createDefaultError(`Could not find organization with id ${organization}`, {}));
  }

  const user = await prisma.user.create({
    data: {
      email: name,
      passwordSalt: "salty",
      passwordHash: hash,
      role: role as Role,
      organization: { connect: { id: organization } || undefined },
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  res.status(201).json(createDefaultSucces("User created succesfully", user));
};
