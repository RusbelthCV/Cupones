import React, { Component } from 'react';

import { withCookies } from 'react-cookie';

import { connect } from 'react-redux';

import {NavLink} from 'react-router-dom';

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: ''
        }
    }
    componentDidMount() {
        let token = this.props.cookies.get('rcc_idusuari');
        if (token) {
            const API = 'http://localhost:3000';
            const url = API + '/api/usuario/' + token;

            fetch(url)
                .then(usuario => usuario.json())
                .then(usuario => {
                    this.setState({
                        nombre: usuario.data['nombre'],
                        email: usuario.data['email'],
                        fecha: usuario.data['nacimiento'],
                    });
                })
        }
    }
    render() {

        return (
            <form>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input className="form-control" value={this.state.nombre} disabled />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input className="form-control" value={this.state.email} disabled />
                </div>
                <div className="form-group">
                    <label>Fecha:</label>
                    <input className="form-control" value={this.state.fecha} disabled />
                </div>
                <NavLink to="/" className="ml-5 btn btn-success btn-lg">
                    <i class="fa fa-home fa-2x" aria-hidden="true"></i>
                </NavLink>
            </form>
        );
    }
}




export default withCookies(connect()(Perfil));