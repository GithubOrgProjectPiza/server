import { Request, Response } from "express";
import { HttpStatusCodes } from "../statusCodes";
import { DataType } from "../datatypes";
import prisma from "../lib/prisma.lib";
import { connect } from "net";

export const addOrder = async (req: Request, res: Response) => {
  if (!Array.isArray(req.body.pizzas)) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      pizzas: DataType.ARRAY,
    });
    return;
  }
  const userId = req.auth?.id;
  if (!userId) return res.status(500).json();

  console.log(req.body.pizzas);

  const pizzas = req.body.pizzas.map((a: number) => ({
    id: a,
  }));

  console.log(pizzas);

  const order = await prisma.order.create({
    data: {
      userId: userId,
      pizzas: {
        connect: pizzas,
      },
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
