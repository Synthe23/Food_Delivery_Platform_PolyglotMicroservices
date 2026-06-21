import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import restaurantRoutes from "./routes/restaurant.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Restaurant Service Running",
  });
});

app.use("/api/restaurants", restaurantRoutes);

export default app;