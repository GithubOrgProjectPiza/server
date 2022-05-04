import { Request, Response } from "express";
import { HttpStatusCodes } from "../statusCodes";
import { DataType } from "../datatypes";
import prisma from "../lib/prisma.lib";

export const addRestaurant = async (req: Request, res: Response) => {
  if (typeof req.body.name !== "string" || typeof req.body.description !== "string") {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      name: DataType.STRING,
      description: DataType.STRING,
    });
    return;
  }

  const restaurant = await prisma.restaurant.create({
    data: {
      name: req.body.name,
      description: req.body.description,
    },
  });

  res.status(HttpStatusCodes.CREATED).json(restaurant);
};

export const updateRestaurant = async (req: Request, res: Response) => {
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

  const restaurant = await prisma.restaurant.update({
    where: {
      id: id,
    },
    data: {
      name: req.body.name,
      description: req.body.description,
    },
  });

  res.status(HttpStatusCodes.OK).json(restaurant);
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      id: DataType.NUMBER,
    });
  }

  await prisma.restaurant.delete({
    where: {
      id: id,
    },
  });

  res.status(HttpStatusCodes.NO_CONTENT).json();
};

export const getRestaurant = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      id: DataType.NUMBER,
    });
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id: id,
    },
  });

  res.status(HttpStatusCodes.OK).json(restaurant);
};

export const getRestaurants = async (_req: Request, res: Response) => {
  const restaurants = await prisma.restaurant.findMany();

  res.status(HttpStatusCodes.OK).json(restaurants);
}
