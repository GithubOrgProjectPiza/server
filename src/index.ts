import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import adminRoutes from "./routes/auth.route";

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

async function main() {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/api/auth", adminRoutes);

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

main();
