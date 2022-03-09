import express from "express";
import { Request, Response } from "express";
import prisma from "../lib/prisma.lib";
import { Role } from "@prisma/client";
import { createDefaultError } from "../lib/standardError";

interface registerBody {
  name: string;
  password: string;
  role: string;
  organization?: number;
}

const ROLES: readonly Role[] = [Role.ADMIN, Role.USER];

export const register = async (req: Request<{}, {}, registerBody>, res: Response) => {
  const { name, password, role, organization } = req.body || {};

  if (!(typeof name === "string" && typeof password === "string" && ROLES.includes(role as any))) {
    return res.status(400).json(
      createDefaultError("Request body does not match required parameters", {
        name: "string",
        password: "string",
        role: "role = user",
      })
    );
  }
  //TODO: Generate hash

  if (!(await prisma.organization.findUnique({ where: { id: organization } }))) {
    return res.status(404).json(createDefaultError(`Could not find organization with id ${organization}`, {}));
  }

  const user = await prisma.user.create({
    data: {
      email: name,
      passwordSalt: "",
      passwordHash: password,
      role: role as Role,
      organization: {connect: {id: organization} || undefined},
    },
    select: {
        id:true,email:true,role:true
    }
  });

};
