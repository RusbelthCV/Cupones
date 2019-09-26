import React from 'react';
//Modulos de Router
import { NavLink } from "react-router-dom";
//Modulos de Router
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//CSS
import './css/Nav';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            busqueda: '',
        };
        this.iniciandoBusqueda = this.iniciandoBusqueda.bind(this);
        this.enviar = this.enviar.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    enviar(e) {
        e.preventDefault();

        this.setState({
            busqueda: ''
        });
    }
    iniciandoBusqueda(e) {
        let text = e.target.value
        this.setState({
            busqueda: text
        });
        this.props.enviar(text);
    }
    logOut() {
        let token = this.props.cookies.get('rcc_idusuari');
        console.log(token);
        const API = "http://localhost:3000";
        let url = API + "/api/usuario/logout";
        fetch(url, {
            method: "DELETE",
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ token })
        })
            .then(res => {
                console.log(res.json());
                this.props.cookies.remove('rcc_nomusuari');
                this.props.cookies.remove('rcc_idusuari');
                this.props.cookies.remove('rcc_token');
                this.props.dispatch({
                    type: 'LOGOUT'
                });
            })
            .catch(error => console.log(error));


    }
    render() {
        let msgLog = "";
        if (this.props.cookies.get('rcc_token')) {
            msgLog = <div className="btn-group botones">
                <div className="d-flex align-items-center ml-3 mr-3 " >
                    <NavLink to="/addCupon" className="btn btn-outline-primary  rojo-secundario fuente-principal shadow-none text-nowrap">Subir Cupón</NavLink>
                </div>
                <div className="d-flex align-items-center ml-3 mr-3 " >
                    <NavLink to="/misCupones" className="btn btn-outline-primary  rojo-secundario fuente-principal shadow-none text-nowrap">Mis Cupones</NavLink>
                </div>
                <div className="d-flex align-items-center ml-3 mr-3 " >
                    <NavLink to="/profile" className="btn btn-outline-primary  rojo-secundario fuente-principal shadow-none text-nowrap">Perfil</NavLink>
                </div>
                <button className="btn btn-outline-primary  rojo-secundario fuente-principal shadow-none text-nowrap" onClick={this.logOut}>LogOut</button>
            </div>
        }
        else {
            console.log("TOKEN NO CREADO");
            msgLog = <div className="btn-group">
                <div className="d-flex align-items-center ml-3 mr-3 " >
                    <NavLink to="/registro" className="btn btn-outline-primary  rojo-secundario fuente-principal shadow-none text-nowrap" type="submit">Registrarse</NavLink>
                </div>
                <div className="d-flex align-items-center ml-3 mr-3 " >
                    <NavLink to="/login" className="btn btn-outline-primary  rojo-secundario fuente-principal shadow-none text-nowrap" type="submit">Iniciar Sesión</NavLink>
                </div>
            </div>

        }
        return (
            <div className="row nav">
                <div className="col-6">
                    {/* Aquí va el buscador y sus filtros */}
                    <form onSubmit={(e) => this.enviar(e)}>
                        <div className="form-group row">
                            <label htmlFor="busqueda" className="mt-2">Busqueda:</label>
                            <div className="col-8">
                                <input type="text" className="form-control" id="busqueda" name="busqueda" value={this.state.busqueda} onChange={this.iniciandoBusqueda} />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-6">
                    {msgLog}
                </div>

            </div>

        );
    }
}
export default withCookies(connect()(Nav));
