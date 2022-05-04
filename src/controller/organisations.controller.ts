import { Request, Response } from "express";
import { HttpStatusCodes } from "../statusCodes";
import { DataType } from "../datatypes";
import prisma from "../lib/prisma.lib";

export const addOrganization = async (req: Request, res: Response) => {
  if (typeof req.body.name !== "string" || typeof req.body.domain !== "string") {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      name: DataType.STRING,
      description: DataType.STRING,
    });
    return;
  }

  const organization = await prisma.organization.create({
    data: {
      name: req.body.name,
      domain: req.body.domain,
    },
  });

  res.status(HttpStatusCodes.CREATED).json(organization);
};

export const updateOrganization = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      id: DataType.NUMBER,
    });
  } else if (typeof req.body.name !== "string" || typeof req.body.domain !== "string") {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      name: DataType.STRING,
      description: DataType.STRING,
    });
    return;
  }

  const organization = await prisma.organization.update({
    where: {
      id: id,
    },
    data: {
      name: req.body.name,
      domain: req.body.domain,
    },
  });

  res.status(HttpStatusCodes.OK).json(organization);
};

export const deleteOrganization = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      id: DataType.NUMBER,
    });
  }

  await prisma.organization.delete({
    where: {
      id: id,
    },
  });

  res.status(HttpStatusCodes.NO_CONTENT).json();
};

export const getOrganization = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      id: DataType.NUMBER,
    });
  }

  const organization = await prisma.organization.findUnique({
    where: {
      id: id,
    },
  });

  res.status(HttpStatusCodes.OK).json(organization);
};
