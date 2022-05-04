import { Request, Response } from "express";
import { HttpStatusCodes } from "../statusCodes";
import { DataType } from "../datatypes";
import prisma from "../lib/prisma.lib";

export const addOrder = async (req: Request, res: Response) => {
  if (typeof req.body.userId !== "number" || !Array.isArray(req.body.pizzas)) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      userId: DataType.NUMBER,
      pizzas: DataType.ARRAY,
    });
    return;
  }

  console.log(req.body.pizzas);

  const order = await prisma.order.create({
    data: {
      userId: req.body.userId,
      pizzas: req.body.pizzas,
    },
  });

  res.status(HttpStatusCodes.CREATED).json(order);
};

export const updateOrder = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      id: DataType.NUMBER,
    });
  } else if (typeof req.body.userId !== "string" || !Array.isArray(req.body.pizzas)) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      name: DataType.STRING,
      pizzas: DataType.ARRAY,
    });
    return;
  }

  const order = await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      userId: req.body.userId,
      pizzas: req.body.pizzas,
    },
  });

  res.status(HttpStatusCodes.OK).json(order);
};

export const deleteOrder = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      id: DataType.NUMBER,
    });
  }

  await prisma.order.delete({
    where: {
      id: id,
    },
  });

  res.status(HttpStatusCodes.NO_CONTENT).json();
};

export const getOrder = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      id: DataType.NUMBER,
    });
  }

  const order = await prisma.order.findUnique({
    where: {
      id: id,
    },
  });

  res.status(HttpStatusCodes.OK).json(order);
};

export const getOrders = async (_req: Request, res: Response) => {
  const orders = await prisma.order.findMany();

  res.status(HttpStatusCodes.OK).json(orders);
};
