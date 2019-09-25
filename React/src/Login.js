import React from 'react';
import {withCookies} from 'react-cookie';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'md5';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            tornar: false
        };
        this.typeEmail = this.typeEmail.bind(this);
        this.typePassword = this.typePassword.bind(this);
        this.enviar = this.enviar.bind(this);
    }
    typeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    typePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    enviar(e){
        e.preventDefault();

        let usuario = {
            email: this.state.email ,
            password: md5(this.state.password)
        };

        const API = "http://localhost:3000";
        fetch(API + '/api/usuario/login' , {
            method: 'POST',
            headers: new Headers({'Content-Type':'application/json'}) ,
            body: JSON.stringify(usuario)
        })
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            console.log(respuesta);
            if(!respuesta.ok){
                throw respuesta.error;
            }
            else{
                return respuesta.data;
            }
        })
        .then(token => {
            console.log(token.nomusuari);
            if(token){
                this.props.cookies.set('rcc_nomusuari',token.nomusuari, {path: '/'});
                this.props.cookies.set('rcc_idusuari',token.idusuari, {path: '/'});
                this.props.cookies.set('rcc_token',token.token, {path: '/'});
                this.props.dispatch({
                    type: 'LOGIN',
                    nomusuari: token.nomusuari,
                    idusuari: token.idusuari,
                    token: token.token
                });
                this.setState({
                    tornar: true
                });
            }
        })
        .catch(error => console.log(error));

    }
    render() {
        console.log(this.state.tornar);
        if(this.state.tornar){
           return <Redirect to="/" />
        }
        return (
            <div className="row mt-5 justify-content-center">
                <form onSubmit = {(e) => this.enviar(e)} className="col-5" method="POST">
                    <div className="form-group text-center">
                        <label htmlFor="email">Email: </label>
                        <input type="email" className="form-control " value={this.state.email} name="email" id="email" onChange={this.typeEmail} />
                    </div>

                    <div className="form-group text-center">
                        <label htmlFor="password">Password: </label>
                        <input type="password" className="form-control " value={this.state.password} name="password" id="password" onChange={this.typePassword} />
                    </div>
                    <div className="col-md-12 text-center">
                        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withCookies(connect()(Login));