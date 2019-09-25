import React from 'react';
import Main from './Main';

import Nav from './Nav';

import Registro from './Registro';
import Login from './Login';
import addCupon from './addCupon';
import ownCupones from './ownCupones';
import Cupon from './Cupon';

import { CookiesProvider, withCookies } from 'react-cookie';
import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cupones: []
    };
    this.dataCupones = this.dataCupones.bind(this);
  }
  dataCupones(data) {
    const API = "http://localhost:3000";
    const url = API + "/api/cupones/"+data;
    console.log(url);
    fetch(url)
      .then(data => data.json())
      .then(datajs => {
        if (datajs.ok) {
          this.setState({ cupones: datajs.data });
        }
      })
      .catch(err => console.log(err));
  }
  componentDidMount(){
    const API = "http://localhost:3000";
    const url = API + "/api/cupones";
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
    return (
      <div className="container mt-2">
        <Nav enviar={this.dataCupones} />
        <Main cupones={this.state.cupones} />
      </div>)
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container mt-2">
          <Switch>
            <Route exact path="/" render={() => <Main cupones={this.state.cupones} />} />
            <Route path="/registro" component={Registro} />
            <Route path = "/login" component = {Login} />
            <Route path = "/addCupon" component = {addCupon} />
            <Route path = "/misCupones" component = {ownCupones} />
            <Route path = "/edit" component = {Cupon} />
          </Switch>

        </div>

      </BrowserRouter>
    );
  }
}

export default App;