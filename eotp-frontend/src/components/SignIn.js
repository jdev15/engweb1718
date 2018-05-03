import React, { Component } from 'react';
import { Link/*, WrappedLink*/ } from 'react-router-dom';

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
          <div class="login">

          <h2 class="login-header">Sign In</h2>

          <form class="login-container">
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
                 /><br/><br/>
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
            </p>
            <p>
            <Link to='/Watchlist'>
              <input
                type="submit"
                value="Login" />
            </Link>
            </p>
          </form>
          </div>
        );
    }
}

export default SignIn;