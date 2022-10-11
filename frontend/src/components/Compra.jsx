import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams} from "react-router-dom";
import "../flight.css";

export const Compra = () => {
    let { tipo, id } = useParams();

    const [count, setCount] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [total, setTotal] = useState(0);

    const getFlight = useCallback(async () => {
        try {
            const { data } = await axios.get("/flights/listid/" + id);

            let total = data.data.precio;
            const normal = (total + (total * 35) / 100);
            const ejecutivo = (normal + (normal * 35) / 100);
            switch(tipo) {
                case 'normal':
                    total = normal;
                case 'ejecutivo':
                    total = ejecutivo;
                case 'economico':
                default:
                    break;
            }

            setPrecio(total);
            setTotal(0);
        } catch (error) {
          if (!error.response.data.ok) {
            return Swal.fire({
              icon: "error",
              title: error.response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }, []);
    
    useEffect(() => {
    getFlight();
    }, [getFlight]);
    
    const updateRate = () => {
        setCount(count + 1);
        setTotal(precio * (count + 1));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2>Elegir asiento</h2>
                    <div className="card">
                        <div className="card-header">
                            <h4>Asientos del avion</h4>
                        </div>
                        <div className="body">
                            <div className="containerflight">
                                <div className="flight">

                                    <div className="fila">
                                    <div className="seccion">
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento1" name="check" onClick={() => updateRate()} />
                                        <label for="asiento1">1</label>
                                        </div>
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento2" name="check" onClick={() => updateRate()} />
                                        <label for="asiento2">2</label>
                                        </div>
                                    </div>
                                    <div className="seccion">
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento3" name="check" onClick={() => updateRate()} />
                                        <label for="asiento3">3</label>
                                        </div>
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento4" name="check" onClick={() => updateRate()} />
                                        <label for="asiento4">4</label>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="fila">
                                    <div className="seccion">
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento5" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento5">5</label>
                                        </div>
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento6" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento6">6</label>
                                        </div>
                                    </div>
                                    <div className="seccion">
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento7" name="check" onClick={() => updateRate()} />
                                        <label for="asiento7">7</label>
                                        </div>
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento8" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento8">8</label>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="fila">
                                    <div className="seccion">
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento9" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento9">9</label>
                                        </div>
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento10" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento10">10</label>
                                        </div>
                                    </div>
                                    <div className="seccion">
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento11" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento11">11</label>
                                        </div>
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento12" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento12">12</label>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="fila">
                                    <div className="seccion">
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento13" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento13">13</label>
                                        </div>
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento14" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento14">14</label>
                                        </div>
                                    </div>
                                    <div className="seccion">
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento15" name="check" onClick={() => updateRate()} />
                                        <label for="asiento15">15</label>
                                        </div>
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento16" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento16">16</label>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="fila">
                                    <div className="seccion">
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento17" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento17">17</label>
                                        </div>
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento18" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento18">18</label>
                                        </div>
                                    </div>
                                    <div className="seccion">
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento19" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento19">19</label>
                                        </div>
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento20" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento20">20</label>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="fila">
                                    <div className="seccion">
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento21" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento21">21</label>
                                        </div>
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento22" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento22">22</label>
                                        </div>
                                    </div>
                                    <div className="seccion">
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento23" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento23">23</label>
                                        </div>
                                        <div className="asiento">
                                        <input type="checkbox" value="None" id="asiento24" name="check" onClick={() => updateRate()}/>
                                        <label for="asiento24">24</label>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h4>Tarjeta de crédito</h4>
                        </div>
                        <div className="body">
                            <div className="card-title">
                                <h2 className="text-center">Pay Invoice</h2>
                            </div>
                            <hr />
                            <form action="" method="post" novalidate="novalidate">
                                <div className="form-group text-center">
                                    <ul className="list-inline">
                                        <li className="list-inline-item"><i className="text-muted fa fa-cc-visa fa-2x"></i></li>
                                        <li className="list-inline-item"><i className="fa fa-cc-mastercard fa-2x"></i></li>
                                        <li className="list-inline-item"><i className="fa fa-cc-amex fa-2x"></i></li>
                                        <li className="list-inline-item"><i className="fa fa-cc-discover fa-2x"></i></li>
                                    </ul>
                                </div>
                                <div className="form-group">
                                    <label>Payment amount</label>
                                    <h2>${total}</h2>
                                </div>
                                <div className="form-group has-success">
                                    <label for="cc-name" className="control-label">Name on card</label>
                                    <input id="cc-name" name="cc-name" type="text" className="form-control cc-name valid" data-val="true" data-val-required="Please enter the name on card" autocomplete="cc-name" aria-required="true" aria-invalid="false" aria-describedby="cc-name-error" />
                                </div>
                                <div className="form-group">
                                    <label for="cc-number" className="control-label">Card number</label>
                                    <input id="cc-number" name="cc-number" type="tel" className="form-control cc-number identified visa" value="" data-val="true" data-val-required="Please enter the card number" data-val-cc-number="Please enter a valid card number" autocomplete="cc-number" />
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label for="cc-exp" className="control-label">Expiration</label>
                                            <input id="cc-exp" name="cc-exp" type="tel" className="form-control cc-exp" value="" data-val="true" data-val-required="Please enter the card expiration" data-val-cc-exp="Please enter a valid month and year" placeholder="MM / YY" autocomplete="cc-exp" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label for="x_card_code" className="control-label">Security code</label>
                                        <div className="input-group">
                                            <input id="x_card_code" name="x_card_code" type="tel" className="form-control cc-cvc" value="" data-val="true" data-val-required="Please enter the security code" data-val-cc-cvc="Please enter a valid security code" autocomplete="off" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="x_zip" className="control-label">Postal code</label>
                                    <input id="x_zip" name="x_zip" type="text" className="form-control" value="" data-val="true" data-val-required="Please enter the ZIP/Postal code" autocomplete="postal-code" />
                                </div>
                                <div>
                                    <button id="payment-button" type="submit" className="btn btn-lg btn-success btn-block">
                                        <i className="fa fa-lock fa-lg"></i>&nbsp;
                                        <span id="payment-button-amount">Pay ${total}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ); 
}
