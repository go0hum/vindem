import { Router } from "express";
import flightCtrl from "../controllers/flight.controller.js";
import { verificarToken } from "../middlewares/Auth.js";
const route = Router();

route.get("/", flightCtrl.listAllFlights);

route.post("/", verificarToken, flightCtrl.createFlight);
route.get("/listid/:id",verificarToken, flightCtrl.listById);
// get flight
route.get("/geb",verificarToken, flightCtrl.listFlights);
route.delete("/delete/:id", verificarToken,flightCtrl.deleteFlight);
route.put("/update/:id",verificarToken, flightCtrl.updateFlight);
route.get("/search/:nombres", verificarToken,flightCtrl.searchFlight);

export default route;
