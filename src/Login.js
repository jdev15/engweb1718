import React, { Component } from 'react';

class Login extends Component {
    state = {
        email: '',
        password: '',
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

          <h2 class="login-header">Login</h2>

          <form class="login-container">
            <p>
            Email
              <input
                name="email"
                type="email"
                placeholder="Email" 
                onChange = {e => this.onChange(e)}
                value = {this.state.email}
                />
            </p>    
            <p>
            Password
              <input
                name = "password"
                type="password"
                placeholder="Password"
                onChange = {e => this.onChange(e)}
                value = {this.state.password}
                 />
            </p>
            <p>
              <input onClick = {() => this.onSubmit()}
                type="submit"
                value="Login" />
            </p>
          </form>
          </div>
        );
    }
}

export default Login;