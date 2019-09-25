import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import './css/ownCupones';


class ownCupones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cupones: []
        };
        this.borrar = this.borrar.bind(this); 
        this.dataCupones = this.dataCupones.bind(this);
        this.redirect = this.redirect.bind(this);
    }
    redirect(id) {
        this.props.history.push('/edit/'+id);
    }
    borrar(e){
        const API = "http://localhost:3000";
        let url = API + '/api/cupones/'+e;
        fetch(url, {
            method: 'DELETE',
            headers: new Headers({'Content-Type':'application/json'}),
            body: JSON.stringify({e})
        })
        .then( () => this.dataCupones())
        .catch(error => console.log(error));
    }
    dataCupones() {
        let token = this.props.cookies.get('rcc_idusuari');
        const API = "http://localhost:3000";
        let url = API + "/api/cupones/miscupones/" + token;
        fetch(url, {
            method: "GET",
            headers: new Headers({ 'Content-Type': 'application/json' })
        })
            .then(cupones => cupones.json())
            .then(cupones => {
                console.log(cupones);
                if (cupones.ok) {
                    this.setState({
                        cupones: cupones.data
                    });
                }
            })
            .catch(err => console.log(err));
    }
    render() {
        if(this.state.cupones.length == 0){
            this.dataCupones();
        }
        let cupones = (this.state.cupones).map((el) =>
            <tr>
                <td>
                    {el.nombre}
                </td>
                <td>
                    {el.caducidad}
                </td>
                <td>
                    {el.descripcion}
                </td>
                <td>
                    <img src={"http://localhost:3000/img/" + el.foto + ".png"} />
                </td>
                <td>
                    {el.valor}
                </td>
                <td>
                    <button className="btn btn-success btn-lg" onClick = { () => this.redirect(el.id)}>
                        <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
                    </button>
                </td>
                <td>
                    <button className = "btn btn-danger btn-lg" onClick = {() => this.borrar(el.id)}>
                        <i className="fa fa-trash fa-2x" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        )
        return (
            <div className="row">
                <div className="table-responsive">
                    <table className="table">
                        <tr className="table-dark">
                            <td >
                                Nombre
                            </td>
                            <td>
                                Caducidad
                            </td>
                            <td>
                                Descripcion
                            </td>
                            <td>
                                Foto
                            </td>
                            <td>
                                Puntos
                            </td>
                        </tr>
                        {cupones}
                    </table>
                </div>
            </div>
        );
    }
}

export default withCookies(connect()(ownCupones));