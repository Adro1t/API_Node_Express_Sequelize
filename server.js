const express = require("express");
const cors = require("cors");

const app = express();

/*sets the `origin` property to `"https://localhost:8000"`, which means that the server will only allow requests from this specific origin. */
var corOptions = {
  origin: "https://localhost:8000",
};

//middlewares
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
const recordRoute = require("./routes/recordRouter");
app.use("/api/records", recordRoute);

//test api
app.get("/", (req, res) => {
  res.json({ message: "hello from api" });
});

//port
const port = process.env.PORT || 8000;

//server
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
