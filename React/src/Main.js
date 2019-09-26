import React from "react";
import 'bootstrap/dist/css/bootstrap';

import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './Nav';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cupones: []
    }
    this.dataCupones = this.dataCupones.bind(this);
    this.datosCupon = this.datosCupon.bind(this);
  }
  datosCupon(id) {
    this.setState({
      datoCupon: id
    });
  }
  componentDidMount() {
    let token = this.props.cookies.get('rcc_idusuari');
    const API = "http://localhost:3000";
    if (!token) {
      const url = API + "/api/cupones/";
      fetch(url)
        .then(data => data.json())
        .then(datajs => {
          if (datajs.ok) {
            this.setState({ cupones: datajs.data });
          }
        })
        .catch(err => console.log(err));
    }
    else {
      const url = API + "/api/cupones/logueado/" + token;
      fetch(url)
        .then(data => data.json())
        .then(datajs => {
          if (datajs.ok) {
            this.setState({ cupones: datajs.data });
          }
        })
        .catch(err => console.log(err));

    }

  }
  dataCupones(data) {
    const API = "http://localhost:3000";
    const url = API + "/api/cupones/" + data;
    fetch(url)
      .then(data => data.json())
      .then(datajs => {
        if (datajs.ok) {
          this.setState({ cupones: datajs.data });
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    let token = this.props.cookies.get('rcc_idusuari');
    let datos;
    if (this.state.cupones.length == 0) {

      datos = <h3>No se encontraron resultados</h3>;
    }
    if (!token) {
      datos = this.state.cupones.map(el => <div className="rounded border col-3 mx-2 my-2" key={el.id}><p>{el.nombre}</p> <img className="img-fluid" src={'http://localhost:3000/uploads/' + el.foto} /> <p>{el.descripcion}</p></div>);
    }
    else {
      datos = this.state.cupones.map(el => <div className="rounded border col-3 mx-2 my-2" key={el.id} onClick={() => this.datosCupon(el.id)}><p>{el.nombre}</p> <img className="img-fluid" src={'http://localhost:3000/uploads/' + el.foto} /> <p>{el.descripcion}</p></div>);
    }
    if (this.state.datoCupon) {
      let id = this.state.datoCupon;
      return <Redirect to={{
        pathname: '/cupon/'+id,
        state: {idCupon:id}
      }} />;
    }
    return (
      <div className="row">
        <Nav enviar={this.dataCupones} />
        <div className="row">
          {datos}
        </div>
      </div>

    );
  }
}


export default withCookies(connect()(Main));
