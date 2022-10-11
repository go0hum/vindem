import { FlightModel } from "../models/flight.model.js";
import message from "../utils/messages.js";
const { messageGeneral } = message;
const flightCtrl = {};

// no se usa desde el frontend
flightCtrl.listAllFlights = async (req, res) => {
  try {
    const resp = await FlightModel.find().populate({
      path: "usuario",
      select: "-password",
    });

    messageGeneral(res, 200, true, resp, "Lista de vuelos");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
};

flightCtrl.createFlight = async (req, res) => {
  try {
    const data = req.body;
    const resp = await FlightModel.create({ ...data, usuario: req.userid });
    messageGeneral(res, 201, true, resp, "vuelo creado");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
};

flightCtrl.listById = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await FlightModel.findById(id);
    if (!resp) {
      return messageGeneral(res, 404, false, "", "Vuelo no encontrado");
    }
    messageGeneral(res, 200, true, resp, "");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
};

flightCtrl.listFlights = async (req, res) => {
  try {
    const resp = await FlightModel.find({ usuario: req.userid });
    messageGeneral(res, 200, true, resp, "");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
};

flightCtrl.deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await FlightModel.findById(id);
    if (!resp) {
      return messageGeneral(res, 404, false, "", "Vuelo no encontrado");
    }
    await resp.deleteOne();
    messageGeneral(res, 200, true, "", "Vuelo eliminado");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
};

flightCtrl.updateFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await FlightModel.findById(id);
    if (!resp) {
      return messageGeneral(res, 404, false, "", "Vuelo no encontrado");
    }
    await resp.updateOne(req.body);
    messageGeneral(res, 200, true, "", "Vuelo actualizado");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
};

flightCtrl.searchFlight = async (req, res) => {
  try {
    const { nombres } = req.params;
    const resp = await FlightModel.find({
      nombres: { $regex: ".*" + nombres + ".*" },
      usuario: req.userid,
    });
    messageGeneral(res, 200, true, resp, "");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
};

export default flightCtrl;
