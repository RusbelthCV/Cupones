import React from "react";
import 'bootstrap/dist/css/bootstrap';

import Nav from './Nav';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cupones: []
    }
    this.dataCupones = this.dataCupones.bind(this);
  }
  componentDidMount() {
    const API = "http://localhost:3000";
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
    let datos = this.state.cupones.map(el => <div className="rounded border col-3 mx-2 my-2" key={el.id}><p>{el.nombre}</p> <img className="img-fluid" src={'http://localhost:3000/img/' + el.foto + ".png"} /> <p>{el.descripcion}</p></div>);
    if (this.state.cupones.length == 0) {
      datos = <h3>No se encontraron resultados</h3>;
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


export default Main;
