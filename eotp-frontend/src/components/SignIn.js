import React, { Component } from 'react';
//import { Link/*, WrappedLink*/ } from 'react-router-dom';
import '../css/signin.css'; 

class SignIn extends Component {
  state = {
    email: null,
    password: null,
    cpassword: null,
    fname: null,
    lname: null,
    username: null,
    tlm: null,
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

  registerUser = (e) => {
    e.preventDefault();
    if(!this.state.email || !this.state.password || !this.state.fname
      || !this.state.lname || !this.state.username || !this.state.tlm)
      alert("Campos por preencher!");
    else if(this.state.password!==this.state.cpassword)
      alert("Erro! Os campos da password não correspondem!");
    else {
      fetch('http://localhost:4000/user/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          fname: this.state.fname,
          lname: this.state.lname,
          username: this.state.username,
          tlm: this.state.tlm,
        }),
      });
    }
  }

  render() {
    return (
      <div className="signin">
      <h3 id="titulo">Preencha os campos abaixo e usufrua da plataforma</h3>
      <h2 className="signin-header">Sign In</h2>
      <form className="signin-container" onSubmit={e => this.registerUser(e)}>
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
        <input
          type="submit"
          value="Registar" />
      </form>
      </div>
    );
  }
}

export default SignIn;