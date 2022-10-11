import mongoose from "mongoose";
const { Schema, model } = mongoose;

const flightSchema = new Schema(
  {
    origen: {
      type: String,
      required: true,
    },
    destino: {
      type: String,
      required: true,
    },
    horasalida: {
      type: String,
      required: true,
    },
    duracion: {
      type: String,
      required: true,
    },
    vuelo: {
      type: String,
      required: true,
    },
    aerolinea: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const FlightModel = model("flight", flightSchema);
