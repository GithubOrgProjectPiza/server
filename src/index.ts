import express from "express";
const app = express();

const testRoutes = require("./routes/testrouter.route");
const ordersRoutes = require("./routes/orders.route");
const organizationsRoutes = require("./routes/organisations.route");
const pizzasRoutes = require("./routes/pizzas.route");
const restaurantsRoutes = require("./routes/restaurants.route");

app.use(express.json());
app.use("/tests", testRoutes);
app.use("/order", ordersRoutes);
app.use("/organization", organizationsRoutes);
app.use("/pizza", pizzasRoutes);
app.use("/restaurant", restaurantsRoutes);

async function main() {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

main();
