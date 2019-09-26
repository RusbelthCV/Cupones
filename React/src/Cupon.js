import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import axios from 'axios';

class Cupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: [],
            selectedFile: false,
            id:this.props.match.params.id
        };
        this.editar = this.editar.bind(this);
        this.enviar = this.enviar.bind(this);
        this.change = this.change.bind(this);
        this.changeFile = this.changeFile.bind(this);
    }
    changeFile = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }
    change(e) {
        console.log(e.target.name);
        this.setState( {
            [e.target.name]: e.target.value
        });
    }
    enviar(e) {
        e.preventDefault();
        const API = "http://localhost:3000";
        let url = API + "/api/cupones/foto";
        const data = new FormData();
        data.append('file',this.state.selectedFile);
        data.append('idfoto',this.state.id);
        axios.post(url,data)
        .then(res => {
            this.props.history.push('/');
        })
    }
    editar(id) {
        console.log();
        let Cupon = {
            id: id,
            nombre: this.state.nombre,
            descripcion: this.state.descripcion,
            caducidad: this.state.caducidad,
            foto: this.state.selectedFile.name,
            valor: this.state.valor
        }
        const API = 'http://localhost:3000';
        let url = API + '/api/cupones/'+id;
        
        fetch(url , {
            method: 'PUT',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(Cupon)
        })
        .then(data => data.json())
        .catch(error => console.log(error));
    }
    componentDidMount() {
        const API = 'http://localhost:3000';
        let id = window.location.href.split("/")
        let last = id.length - 1;
        let url = API + '/api/cupones/individual/' + id[last];
        fetch(url)
            .then(cupon => cupon.json())
            .then(cupon => {
                if (cupon.ok) {
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
            .catch(error => console.log(error));
    }
    render() {
        let datosCupon = this.state.datos;
        let cupon = "";
        if (this.state.datos.length != 0) {
            cupon =
                <form onSubmit = {(e) => this.enviar(e)}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" className="form-control" value={this.state.nombre} name="nombre" id="nombre" onChange = {this.change} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion">descripcion:</label>
                        <textarea className="form-control" value={this.state.descripcion} name="descripcion" id="descripcion" onChange = {this.change}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="puntos">Puntos:</label>
                        <input type="number" className="form-control" value={this.state.valor} name="valor" id="puntos" onChange = {this.change}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="caducidad">Caducidad:</label>
                        <input type="date" className="form-control" value={this.state.caducidad} name="caducidad" id="caducidad" onChange = {this.change}/>
                    </div>
                    <div className="form-group">
                        <img src = {"http://localhost:3000/uploads/"+datosCupon.foto} />
                        <br></br>
                        <label htmlFor="foto">Foto:</label>
                        <input type="file" className="form-control"  name="file" id="foto" onChange = {this.changeFile}/>
                        <input type="hidden" name="idfoto" value={this.state.id} />
                    </div>
                    <button type = "submit" className = "btn btn-success btn-lg" onClick = { () => this.editar(datosCupon.id) }>Guardar Cambios</button>
                </form>;
        }

        return (
            <div className = "row justify-content-center">
                { cupon }
            </div>
        );
    }
}


export default withCookies(connect()(Cupon));