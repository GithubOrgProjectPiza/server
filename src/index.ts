import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

import adminRoutes from "./routes/auth.route";
const ordersRoutes = require("./routes/orders.route");
const organizationsRoutes = require("./routes/organisations.route");
const pizzasRoutes = require("./routes/pizzas.route");
const restaurantsRoutes = require("./routes/restaurants.route");

dotenv.config();

const app = express();

// Bodyparser and urlencoded to parse post request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(400).send({
      type: "error",
      payload: "The body of your request did not contain valid data",
    });
  } else {
    next();
  }
});

app.use("/auth", adminRoutes);
app.use("/order", ordersRoutes);
app.use("/organization", organizationsRoutes);
app.use("/pizza", pizzasRoutes);
app.use("/restaurant", restaurantsRoutes);

async function main() {
  app.get("/", (_req, res) => {
    res.send("Hello World!");
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

main();
