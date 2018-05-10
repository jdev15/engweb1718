import React, { Component } from 'react';
import { Link/*, WrappedLink*/ } from 'react-router-dom';
import '../css/signin.css'; 

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        cpassword: '',
        fname: '',
        lname: '',
        username: '',
        tlm: '',
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSubmit = (e) => {
        const response = this.props.mutate({
            variables: this.state,
        });
        console.log(response);
    }

    render() {
        return (
          <div className="signin">
          <h3 id="titulo">Preencha os campos abaixo e usufrua da plataforma</h3>

          <h2 className="signin-header">Sign In</h2>

          <form className="signin-container">
            <p>
            <h3>Email</h3>
              <input
                name="email"
                type="email"
                placeholder="Email" 
                onChange = {e => this.onChange(e)}
                value = {this.state.email}
                />
            </p>    
            <p>
            <h3>Password</h3>
              <input
                name = "password"
                type="password"
                placeholder="Password"
                onChange = {e => this.onChange(e)}
                value = {this.state.password}
                 />
            </p>
            <p>
            <h3>Confirme a Password</h3>
              <input
                name = "cpassword"
                type="password"
                placeholder="Password"
                onChange = {e => this.onChange(e)}
                value = {this.state.cpassword}
                 />
            </p>
            <p>
            <h3>Nome</h3>
              <input
                name = "fname"
                type="text"
                placeholder="Primeiro Nome"
                onChange = {e => this.onChange(e)}
                value = {this.state.fname}
                 /> 
              <input
                name = "lname"
                type="text"
                placeholder="Último Nome"
                onChange = {e => this.onChange(e)}
                value = {this.state.lname}
                 /><br/>
            </p>
             <p>
            <h3>Username</h3>
              <input
                name = "username"
                type="text"
                placeholder="Username"
                onChange = {e => this.onChange(e)}
                value = {this.state.username}
                 />
            </p>
             <p>
            <h3>Telemóvel</h3>
              <input
                name = "tlm"
                type="text"
                placeholder="Telemóvel"
                onChange = {e => this.onChange(e)}
                value = {this.state.tlm}
                 />
            </p><br/>
            <Link to='/TabelaInicial'>
              <button className="bregisto">Registar</button>
            </Link>
          </form>
          </div>
        );
    }
}

export default SignIn;