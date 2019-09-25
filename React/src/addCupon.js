import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
class addCupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            descripcion: '',
            valor: '',
            caducidad: '',
            propietario: this.props.cookies.get('rcc_nomusuari'),
            idpropietario: this.props.cookies.get('rcc_idusuari')
        };
        this.change = this.change.bind(this);
        this.enviar = this.enviar.bind(this);
    }
    enviar(e) {
        e.preventDefault();
        const API = "http://localhost:3000";
        const url = API + "/api/cupones/add";
        
        let cupon = {
            nombre: this.state.nombre,
            caducidad: this.state.caducidad,
            descripcion: this.state.descripcion,
            foto: "airbnb",
            valor: this.state.precio,
            enVenta: 1,
            usuario: this.state.idpropietario,
        };

        fetch(url, {
            method: "POST",
            headers: new Headers({'Content-Type':'application/json'}),
            body:JSON.stringify(cupon)
        })
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            if(respuesta.ok){
                console.log("OK");
            }
            return respuesta
        })
        .catch(error => res.json({
            ok: false,
            error: error
        }));

    }
    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        console.log(this.props.cookies.get('rcc_idusuari'));
        return (
            <div className="d-flex justify-content-center ">
                <form method="POST" onSubmit = {(e) => this.enviar(e)}>
                    <div className="form-group">
                        <label htmlFor = "nombre">Nombre</label>
                        <input  type = "text" className="form-control" value={this.state.nombre} name="nombre" id = "nombre" onChange = {this.change} />
                    </div>
                    <div className="form-group">
                        <label htmlFor = "descripcion">Descripción</label>
                        <textarea className="form-control" value={this.state.descripcion} name="descripcion" id = "descripcion" onChange = {this.change} />
                    </div>
                    <div className="form-group">
                        <label htmlFor = "valor">Puntos: </label>
                        <input type = "number" className="form-control" value={this.state.valor} name="valor" id = "valor" onChange = {this.change} />
                    </div>
                    <div className="form-group">
                        <label htmlFor = "caducidad">Caducidad: </label>
                        <input type = "date" className="form-control" value={this.state.caducidad} name="caducidad" id = "caducidad" onChange = {this.change} />
                    </div>
                    <div className="form-group">
                        <label htmlFor = "propietario">Propietario: </label>
                        <input type = "text" className="form-control" value={this.state.propietario} name="propietario" id = "propietario" disabled />
                    </div>
                    <button className = "btn btn-lg btn-success" type = "submit">Publicar</button>
                </form>
            </div>
        )
    }
}

export default withCookies(connect()(addCupon));