import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import TabelaInicial from './tables/TabelaInicial';
import TabelaInvestimento from './tables/TabelaInvestimento';
import TabelaHistorico from './tables/TabelaHistorico';
import SideBar from './common/SideBar';
import TopBar from './common/TopBar';

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: '',
      JWTToken: '',
      data: '', //user data, como plafond ou nome
    }
    this.loggedIn = this.loggedIn.bind(this);
    this.loggedOut = this.loggedOut.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.changePlafond = this.changePlafond.bind(this);
    this.changeUserData = this.changeUserData.bind(this);
  }

  isLoggedIn() {
    //console.log("Check value");
    return this.state.isLoggedIn;
  }

  loggedIn(u, t, d) {
    this.setState({
        isLoggedIn: true,
        user: u,
        JWTToken: t,
        data: d,
    });
    //console.log(d);
    //console.log(this.state);
  }

  loggedOut() {
    this.setState({
      isLoggedIn: false,
      user: '',
      JWTToken: '',
      data: ''
    });
  }

  async changePlafond(deposit, value) {
    if(deposit==='test'){
      console.log(deposit, value);
      return;
    }
    console.log(deposit, value);
    var ammount;
    //caso seja um deposito de dinheiro na conta
    if(deposit)
      ammount = this.state.data.plafond + parseInt(value, 10);
    //caso queira retirar dinheiro da conta
    else {
      ammount = this.state.data.plafond - parseInt(value, 10);
      if(ammount<0) {
        alert("Erro! Plafond Insuficiente!");
        return;
      }
    }
    console.log(ammount);
    //manda valor atualizado ao server pra atualizar BD
    await fetch('http://localhost:4000/user/addplafond', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.state.JWTToken,
        plafond: ammount,
      }),
    }).then(async (res) => {
      if(!res.ok) {
        alert("Erro a atualizar o Plafond!");
        const test = await res.json();
        console.log(res);
        console.log(test);
      }
      else {
        var newData = this.state.data;
        newData.plafond = ammount;
        this.setState({
          data: newData,
        });
      }
    });
  }

  async changeUserData(data, pass) {
    var values = data; var body;
    values.plafond = this.state.data.plafond;
    if(pass) body={
      token: this.state.JWTToken,
      data: values,
      pass: pass,
    };
    else body={
      token: this.state.JWTToken,
      data: values,
      pass: '',
    }
    //console.log(body);
    await fetch('http://localhost:4000/user/changeprofile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(async (res) => {
      if(!res.ok) {
        alert("Erro a atualizar o perfil!");
        const test = await res.json();
        console.log(res);
        console.log(test);
      }
      else {
        this.setState({
          data: body.data,
        });
      }
    });
  }

  // go to the API to get last values
  getStock(){

  }


  render() {
    return (
      <div>
        <SideBar
          isLoggedIn={this.isLoggedIn}
          loggedIn={this.loggedIn}
          data={this.state.data}
          changeUserData={this.changeUserData}
          />
        <TopBar
          isLoggedIn={this.isLoggedIn}
          loggedOut={this.loggedOut}
          user={this.state.user}
          data={this.state.data}
          changePlafond={this.changePlafond}/>
        <main>
          <Switch>
            <Route path='/TabelaInicial' render = {(props) => (<TabelaInicial isLoggedIn={this.state.isLoggedIn}/>)} />
            <Route path='/SignIn' component={SignIn}/>
            <Route path='/TabelaInvestimento' component={TabelaInvestimento}/>
            <Route path='/TabelaHistorico' component={TabelaHistorico}/>
            <Route exact path='/' render = {(props) => (<TabelaInicial isLoggedIn={this.state.isLoggedIn}/>)} />
            <Route exact path='/' component={SignIn}/>
            <Route exact path='/' component={TabelaInvestimento}/>
            <Route exact path='/' component={TabelaHistorico}/>
          </Switch>
      </main>
      </div>
    );
  }

}
export  default Page;

//<Route path='/Watchlist' component={Watchlist}/>
//<Route exact path='/' component={Watchlist}/>