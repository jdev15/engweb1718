import React from 'react';
import '../css/SideBarLogedout.css';
import { Link/*, WrappedLink*/ } from 'react-router-dom';

class SideBarLogedout extends React.Component {
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

      <h2 class="login-header">Bem-Vindo</h2>

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
      <input onClick = {() => this.props.changeLogin()}
      type="submit"
      value="LOGIN" />
      </p>
      <p>
      <Link to='/SignIn'>
        <button>Registe-se aqui</button>
      </Link>
      </p>
      </form>
      </div>
      );
  }
}

export default SideBarLogedout;