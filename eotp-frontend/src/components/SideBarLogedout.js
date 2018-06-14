import React from 'react';
import '../css/SideBarLogedout.css';
import { Link/*, WrappedLink*/ } from 'react-router-dom';

class SideBarLogedout extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user: '',
      pass: '',
    }
    this.validateLogin = this.validateLogin.bind(this);
  }

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

  async validateLogin(e) {
    e.preventDefault();
    await fetch('http://localhost:4000/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.state.user,
        pass: this.state.pass,
      }),
    }).then(async (res) => {
      if(res.ok) {
        const ans = await res.json();
        this.props.loggedIn(this.state.user, ans.token, ans.data);
        //console.log(ans.token);
      }
      else {
        alert("Informação de Login inválida!");
        this.setState({
          user:'',
          pass:'',
        });
      }
    });
  }


  render() {
    //console.log('User: '+username+'; Pass: '+password);
    return (
      <div className="login">
        <h2 className="login-header">Bem-Vindo</h2>
        <form className="login-container"
          onSubmit={this.validateLogin}>
          <p>
            Username
            <input
            name="user"
            type="text"
            placeholder="Username" 
            onChange = {e => this.onChange(e)}
            value = {this.state.user}
            />
          </p>
          <p>
            Password
            <input
            name = "pass"
            type="password"
            placeholder="Password"
            onChange = {e => this.onChange(e)}
            value = {this.state.pass}
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

//onSubmit={() => this.props.validateLogin()}

export default SideBarLogedout;