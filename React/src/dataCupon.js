import React , { Component } from 'react';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { Redirect,NavLink } from 'react-router-dom';

class dataCupon extends Component {
    constructor (props) {
        super(props);
        this.state = {
            datos: [],
            id: this.props.location.state.idCupon,
            adquisicion: 'd-none'
        };
        this.adquirir = this.adquirir.bind(this);
    }
    back() {
        setTimeout(() => {
            this.setState({
                borrado: true
            })
        }, 2000);
        
    }
    adquirir(id) {
        const API = 'http://localhost:3000';
        const url = API + '/api/cupones/'+id;
        fetch(url , {
            method: 'DELETE',
            headers: new Headers({'Content-Type':'application/json'}),
            body: JSON.stringify({id})
        })
        .then( () => {
            this.setState({
                adquisicion: 'd-block'
            });
        })
        .catch(error => console.log(error));
    }
    componentDidMount() {
        const API = 'http://localhost:3000';
        const url = API +'/api/cupones/individual/'+this.state.id;
        fetch(url)
        .then(cupon => cupon.json())
        .then(cupon => {
            if(cupon.ok) {
                this.setState({
                    datos: cupon.data,
                    id: cupon.data['id'],
                    nombre:cupon.data['nombre'],
                    descripcion: cupon.data['descripcion'],
                    caducidad: cupon.data['caducidad'],
                    valor: cupon.data['valor'],
                    foto: cupon.data['foto']
                });
            }
            else {
                cupon.json({
                    error: "No existe un cupón con esta id"
                });
            }
        })
        .catch(err => console.log(err));
    }   
    
    render() {
        let datosCupon = this.state.datos;
        let cupon = "";
        if(this.state.adquisicion != "d-none") {
            {this.back()}
        }
        if(this.state.borrado) {
            return <Redirect to = "/" />
        }
        if (this.state.datos.length != 0) {
            cupon =
                <form>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" className="form-control" value={this.state.nombre} name="nombre" id="nombre" disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion">descripcion:</label>
                        <textarea className="form-control" value={this.state.descripcion} name="descripcion" id="descripcion" disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="puntos">Puntos:</label>
                        <input type="number" className="form-control" value={this.state.valor} name="valor" id="puntos" disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="caducidad">Caducidad:</label>
                        <input type="date" className="form-control" value={this.state.caducidad} name="caducidad" id="caducidad" disabled/>
                    </div>
                    <div className="form-group">
                        <img src = {"http://localhost:3000/uploads/"+datosCupon.foto} />
                        <br></br>
                    </div>
                    <button type = "button" className = "btn btn-success btn-lg" onClick = { () => this.adquirir(this.state.id) }>Adquirir</button>
                    <NavLink to = "/" className = "ml-5 btn btn-success btn-lg">
                        <i class="fa fa-home fa-2x" aria-hidden="true"></i>
                    </NavLink>
                    <span className = {"alert alert-success mt-4 p-4 "+this.state.adquisicion}><strong>Acabas de adquirir este Cupón!</strong></span>
                </form>;
        }

        return(
            <div className = "row">
                {cupon}
            </div>
        );
    }
}

export default withCookies(connect()(dataCupon));