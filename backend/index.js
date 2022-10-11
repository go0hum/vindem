import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./src/database.js";
import userRoute from "./src/routes/usuario.route.js";
import flightRoute from "./src/routes/flight.route.js";

connectDB();
const app = express();

app.set("port", 4000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api", userRoute);
app.use("/api/flights", flightRoute);

app.listen(app.get("port"), () => {
  console.log(`servidor escuchando por el puerto' ${app.get("port")}`);
});
