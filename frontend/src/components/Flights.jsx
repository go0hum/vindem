import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../context/UserContext";
import { Loading } from "./Loading";
import { ModalActions } from "./ModalActions";

export const Flights = () => {
  const { user } = useUser();
  const [flights, setFlights] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFlights = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/flights/geb");
      setFlights(data.data);
      setFilterData(data.data);
      setLoading(false);
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
      console.log("error en la funcion getFlights", error.message);
    }
  }, []);

  useEffect(() => {
    getFlights();
  }, [getFlights]);

  const deleteFlight = async (id) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Esta acción no es reversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete("/flights/delete/" + id);
        getFlights();
        Swal.fire({
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  //   manejar modal
  const [flight, setFlight] = useState(false);
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const onOpenModal = (edit, flight) => {
    setOpen(true);
    setEdit(edit);
    setFlight(flight);
  };
  const onCloseModal = () => setOpen(false);

  // busqueda desde el frontend
  const search = (value) => {
    let updatedData = [];
    if (value.length) {
      updatedData = flights.filter((item) => {
        const startWith =
          item.nombres.toLowerCase().startsWith(value.toLowerCase()) ||
          item.apellidos.toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.nombres.toLowerCase().includes(value.toLowerCase()) ||
          item.apellidos.toLowerCase().includes(value.toLowerCase());

        if (startWith) {
          return startWith;
        } else if (!startWith && includes) {
          return includes;
        } else return null;
      });
      setFilterData(updatedData);
    } else {
      setFilterData(flights);
    }
  };

  return (
    <div>
      <nav className="navbar py-4">
        <div className="container">
          { user.privilegio === 'EDITOR' ? (
          <div className="col-md-3">
            <button
              className="btn btn-primary"
              onClick={() => onOpenModal(false, {})}
            >
              <i className="fas fa-plus"></i> Add Vuelo
            </button>
          </div>
          ) : ("")}
          <div className="col-md-6 ml-auto">
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Buscar..."
                aria-label="Search"
                required
                onChange={(e) => search(e.target.value)}
              />
            </div>
          </div>
        </div>
      </nav>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>Vuelos</h4>
                </div>
                {loading ? (
                  <Loading />
                ) : (
                  <div className="table-responsive-lg">
                    <table className="table table-striped">
                      <thead className="table-dark">
                        <tr>
                          <th>Origen</th>
                          <th>Destino</th>
                          <th>Hora de salida</th>
                          <th>Duración de viaje</th>
                          <th># Vuelo y aerolinea</th>
                          { user.privilegio === 'EDITOR' ? (
                            <th></th>
                          ) : ("") }
                          { user.privilegio === 'EDITOR' || user.privilegio === 'PREMIUM' ? (
                          <th></th>
                          ) : ("")}
                        </tr>
                      </thead>

                      <tbody>
                        {filterData.map((item, i) => {
                          const economico = item.precio;
                          const normal = economico + ((economico * 35) / 100);
                          const ejecutivo = normal + ((normal * 35) / 100);;
                          return (
                            <tr key={item._id}>
                              <td>{item.origen}</td>
                              <td>{item.destino}</td>
                              <td>{item.horasalida}</td>
                              <td>{item.duracion}</td>
                              <td>{item.vuelo}/{item.aerolinea}</td>
                              { user.privilegio === 'EDITOR' ? (
                                <td>
                                  <button
                                    className="btn btn-danger me-1"
                                    onClick={() => deleteFlight(item._id)}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                  <button
                                    className="btn btn-warning"
                                    onClick={() => onOpenModal(true, item)}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                              </td>
                              ) : ("")}
                              { user.privilegio === 'EDITOR' || user.privilegio === 'PREMIUM' ? (
                                <td>
                                <NavLink className="btn btn-success" to={`/compra/economico/${item._id}`}>
                                  Precio Económico: {economico}
                                </NavLink>
                                <NavLink className="btn btn-info" to={`/compra/normal/${item._id}`}>
                                  Precio Normal: { normal }
                                </NavLink>
                                <NavLink className="btn btn-danger" to={`/compra/ejecutivo/${item._id}`}>
                                  Precio Ejecutivo: { ejecutivo }
                                </NavLink>
                                </td>
                            ) : ("")}
                            </tr>
                          )}
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalActions
        open={open}
        onCloseModal={onCloseModal}
        getFlights={getFlights}
        edit={edit}
        flight={flight}
      />
    </div>
  );
};
