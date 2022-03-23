import { Request, Response } from "express";

export function sayHello(request: Request, response: Response) {
    console.log(request.params);
    response.send(request.params.id);
}