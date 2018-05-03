import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import TabelaInicial from './tables/TabelaInicial';
import TabelaInvestimento from './tables/TabelaInvestimento';
import TabelaHistorico from './tables/TabelaHistorico';

function Main(props) {
  return(
    <main>
      <Switch>
        <Route path='/TabelaInicial' component={TabelaInicial}/>
        <Route path='/SignIn' component={SignIn}/>
        <Route path='/TabelaInvestimento' component={TabelaInvestimento}/>
        <Route path='/TabelaHistorico' component={TabelaHistorico}/>
        <Route exact path='/' component={TabelaInicial}/>
        <Route exact path='/' component={SignIn}/>
        <Route exact path='/' component={TabelaInvestimento}/>
        <Route exact path='/' component={TabelaHistorico}/>
      </Switch>
    </main>
  );
}

export default Main;

//<Route path='/Watchlist' component={Watchlist}/>
//<Route exact path='/' component={Watchlist}/>