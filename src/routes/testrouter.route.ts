import { Request, Response } from "express";

const express = require('express');
const router = express.Router();
 
router.get('/', (request: Express.Request, response: Response) => {
  response.status(200).send("Cool test stuff!");
});

module.exports = router;