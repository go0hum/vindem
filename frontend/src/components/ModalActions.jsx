import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";

export const ModalActions = ({
  open,
  onCloseModal,
  getFlights,
  edit,
  flight,
}) => {
  const initialState = {
    origen: "",
    destino: "",
    horasalida: "",
    duracion: "",
    vuelo: "",
    aerolinea: "",
    precio: 0,
  };

  const [dataFlight, setDataFlight] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    edit ? setDataFlight(flight) : setDataFlight(initialState);
  }, [edit, flight]);

  const handleChange = (e) => {
    console.log("origen: " + e.target.origen);
    setDataFlight({ ...dataFlight, [e.target.name]: e.target.value });
  };

  const actions = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let resp = {};
      edit
        ? (resp = await axios.put(
            `/flights/update/${flight._id}`,
            dataFlight
          ))
        : (resp = await axios.post("/flights", dataFlight));
      Swal.fire({
        icon: "success",
        title: resp.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      onCloseModal();
      getFlights();
    } catch (error) {
      setLoading(false);
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log("error en la funcion actions", error.message);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="card">
          <div className="card-header">
            <h5>{edit ? "Editar Vuelo" : "Agregar Vuelo"}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={actions}>
              <div className="mb-3">
                <label className="form-label">Origen</label>
                <input
                  type="text"
                  className="form-control"
                  name="origen"
                  required
                  autoFocus
                  onChange={(e) => handleChange(e)}
                  value={dataFlight.origen}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Destino</label>
                <input
                  type="text"
                  className="form-control"
                  name="destino"
                  required
                  onChange={(e) => handleChange(e)}
                  value={dataFlight.destino}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Hora de Salida</label>
                <input
                  type="text"
                  className="form-control"
                  name="horasalida"
                  required
                  onChange={(e) => handleChange(e)}
                  value={dataFlight.horasalida}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Duracion de Viaje</label>
                <input
                  type="text"
                  className="form-control"
                  name="duracion"
                  required
                  onChange={(e) => handleChange(e)}
                  value={dataFlight.duracion}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Vuelo</label>
                <input
                  type="text"
                  className="form-control"
                  name="vuelo"
                  required
                  onChange={(e) => handleChange(e)}
                  value={dataFlight.vuelo}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Aerolinea</label>
                <input
                  type="text"
                  className="form-control"
                  name="aerolinea"
                  required
                  onChange={(e) => handleChange(e)}
                  value={dataFlight.aerolinea}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Precio</label>
                <input
                  type="text"
                  className="form-control"
                  name="precio"
                  required
                  onChange={(e) => handleChange(e)}
                  value={dataFlight.precio}
                />
              </div>
              {!loading ? (
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary form-control"
                  >
                    {edit ? "Actualizar" : "Guardar"}
                  </button>
                </div>
              ) : (
                <button className="btn btn-primary form-control" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {edit ? " Actualizando" : " Guardando"}
                </button>
              )}
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};
