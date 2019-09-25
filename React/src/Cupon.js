import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';

class Cupon extends Component {
    constructor(props){
        super(props);
        this.state = {
            datos: []
        };

    }
    componentDidMount() {
        const API = 'http://localhost:3000';
        let id = window.location.href.split("/")
        let last = id.length-1;
        let url = API + '/api/cupones/individual/'+id[last];
        fetch(url)
        .then(cupon => cupon.json())
        .then(cupon => {
            if(cupon.ok) {
                this.setState({
                    datos: cupon.data
                });
            }
            else {
                cupon.json({
                    error: "No existe un cupón con esta id"
                });
            }
        })
        .catch(error => console.log(error));
    }
    render() {
        let datosCupon = this.state.datos;
        let cupon = "";
        if(this.state.datos.length != 0){
            cupon = 
            <div className = "form-group">
                <label htmlFor = "nombre">Nombre:</label>
                <input type = "text" className = "form-control" value = {datosCupon.nombre} name = "nombre" id = "nombre" />
            </div>
        }
        
        return(

            <form>
                {cupon}
            </form>
        );
    }
}


export default withCookies(connect()(Cupon));