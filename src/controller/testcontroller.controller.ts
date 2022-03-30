import { Request, Response } from "express";

export const sayHello = async (request: Request, response: Response) => 
{
    response.status(200).send("Hello!");
}
