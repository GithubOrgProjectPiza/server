import { Request, Response } from "express";
import { HttpStatusCodes } from "../statusCodes";
import { DataType } from "../datatypes";
import prisma from "../lib/prisma.lib";

export const addPizza = async (req: Request, res: Response) => {
  if (typeof req.body.name !== "string" || typeof req.body.description !== "string") {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      name: DataType.STRING,
      description: DataType.STRING,
    });
    return;
  }

  const pizza = await prisma.pizza.create({
    data: {
      name: req.body.name,
      restaurantId: -1
    },
  });

  res.status(HttpStatusCodes.CREATED).json(pizza);
};

export const updatePizza = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      id: DataType.NUMBER,
    });
  } else if (typeof req.body.name !== "string" || typeof req.body.description !== "string") {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      name: DataType.STRING,
      description: DataType.STRING,
    });
    return;
  }

  const pizza = await prisma.pizza.update({
    where: {
      id: id,
    },
    data: {
      name: req.body.name,
      description: req.body.description,
    },
  });

  res.status(HttpStatusCodes.OK).json(pizza);
};

export const deletePizza = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      id: DataType.NUMBER,
    });
  }

  await prisma.pizza.delete({
    where: {
      id: id,
    }
  });

  res.status(HttpStatusCodes.NO_CONTENT).json();
};

export const getPizza = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      id: DataType.NUMBER,
    });
  }

  const pizza = await prisma.pizza.findUnique({
    where: {
      id: id
    }
  });

  res.status(HttpStatusCodes.OK).json(pizza);
};
