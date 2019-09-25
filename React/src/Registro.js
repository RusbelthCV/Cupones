//Modulo React
import React from 'react';

import './css/Registro';

import { Redirect } from 'react-router-dom';

import md5 from 'md5';

class Registro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            email: '',
            fecha: '',
            password: '',
            inputEmail: '',
            errorEmail: 'd-none',
            inputEdad: '',
            errorEdad: 'd-none',
            succes: 'd-none'
        }
        this.escribirNombre = this.escribirNombre.bind(this);
        this.escribirEmail = this.escribirEmail.bind(this);
        this.escribirPassword = this.escribirPassword.bind(this);
        this.escribirFecha = this.escribirFecha.bind(this);
        this.enviar = this.enviar.bind(this);
    }
    enviar(e) {
        e.preventDefault();
        let usuario = {
            nombre: this.state.nombre,
            email: this.state.email,
            password: md5(this.state.password),
            nacimiento: this.state.fecha
        }
        const API = "http://localhost:3000";
        fetch(API + '/api/usuario/create', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(usuario)
        })
            .then(respuesta => respuesta.json())
            .then(respuesta => {
                if (!respuesta.ok) {
                    console.log(respuesta);
                    if (respuesta.Mayor == 0) {
                        this.setState({
                            inputEdad: 'errorInEdad',
                            errorEdad: 'd-block'
                        })
                    }
                    else {
                        this.setState({
                            inputEdad: '',
                            errorEdad: 'd-none'
                        });
                    }
                    if (respuesta.error) {
                        this.setState({
                            inputEmail: 'errorEmail',
                            errorEmail: 'd-block'
                        });
                    }
                }
                else {
                    this.setState({
                        succes: 'd-block',
                        inputEmail: '',
                        errorEmail: 'd-none'
                    });
                    setTimeout(() => {
                        this.props.history.push(`/`);
                    }, 2000);
                }
                return respuesta;
            })
            .then(() => this.setState({ toList: true }))
            .catch(err => console.error(err))
    }
    escribirFecha(e) {
        this.setState({
            fecha: e.target.value
        });
    }
    escribirPassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    escribirNombre(e) {
        this.setState({
            nombre: e.target.value
        });
    }
    escribirEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    render() {
        return (
            <div className="row justify-content-center">
                <form onSubmit={(e) => this.enviar(e)} className="col-10" method="POST">
                    <div className="form-group row">

                        <legend className="text-center header">Registro</legend>
                        <hr />

                        <br />
                        <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                        <div className="col-md-8">
                            <input type="text" name="nombre" id="nombre" className="form-control" value={this.state.nombre} onChange={this.escribirNombre} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-calendar bigicon" aria-hidden="true"></i></span>
                        <div className="col-md-8">
                            <input type="date" className={"form-control " + this.state.inputEdad} name="fecha" id="fecha" value={this.state.fecha} onChange={this.escribirFecha} />
                            <span className={"errorEdad " + this.state.errorEdad}>Error, no cumples los requisitos de edad</span>
                            {/* El span es el mensaje de error para los menores de edad */}
                        </div>
                    </div>
                    <div className="form-group row">
                        <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-envelope bigicon" aria-hidden="true"></i></span>
                        <div className="col-md-8">
                            <input type="email" name="email" className={"form-control " + this.state.inputEmail} value={this.state.email} onChange={this.escribirEmail} />
                            <span className={"errorEmailMsg " + this.state.errorEmail}>Error, email existente</span>
                            {/* El span es el mensaje de error para emails repetidos */}
                        </div>
                    </div>
                    <div className="form-group row">
                        <span className="col-md-1 col-md-offset-2 text-center"> <i className="fa fa-key bigicon" aria-hidden="true"></i> </span>
                        <div className="col-md-8">
                            <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.escribirPassword} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                        </div>
                    </div>
                    {/*====================================
                                Mensaje de inserción correcta 
                        =======================================*/}
                    <div className={"alert alert-dismissable alert-success " + this.state.succes}>
                        <h3>Te has registrado correctamente</h3>
                    </div>
                </form>
            </div>
        )
    }
}

export default Registro;