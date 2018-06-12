import React from 'react';
import '../css/SideBarLogedout.css';
import { Link/*, WrappedLink*/ } from 'react-router-dom';

class SideBarLogedout extends React.Component {  constructor(props) {

    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.validateLogin = this.validateLogin.bind(this);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    //console.log(this.state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const response = this.props.mutate({
      variables: this.state,
    });
    console.log(response);
  }

  validateLogin(e) {
    e.preventDefault();
    fetch('http://localhost:4000/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.state.email,
        pass: this.state.password,
      }),
    }).then(res => {
      if(res.ok)
        this.props.changeLogin();
      else {
        alert("Informação de Login inválida!");
        this.setState({
          email: '',
          password: '',
        })
      }
    });
  }

  render() {
    return (
      <div className="login">
        <h2 className="login-header">Bem-Vindo</h2>
        <form className="login-container" onSubmit={this.validateLogin}>
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
            <input
            type="submit"
            value="Login" />
          </p>
          <p>
            <Link to='/SignIn'>
            <input
            type="submit"
            value="Registe-se Aqui" />
            </Link>
          </p>
        </form>
      </div>
      );
  }
}

export default SideBarLogedout;