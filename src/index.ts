import express from "express";
const app = express();

let testRoutes = require("./routes/testrouter.route");
app.use(express.json());
app.use("/tests", testRoutes);

async function main() {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

main();