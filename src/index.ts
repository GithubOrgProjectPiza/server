import express from "express";
const app = express();

let testRoutes = require('./routes/testrouter.route');
app.use("/tests", testRoutes);



async function main() {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
app.get("/api/", (req, res) => {
  res.send("  welcome World running on port 3000");
})
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

main();
