import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Watchlist from './Watchlist';
import Portfolio from './Portfolio';
import Historico from './Historico';
import TabelaInicial from './TabelaInicial';
import TabelaInvestimento from './TabelaInvestimento';
import TabelaHistorico from './TabelaHistorico';
import SideBar from './SideBar';
import SideBarLogedin from './SideBarLogedin';

function Main(props) {
  return(
    <main>
      <Switch>
      	<Route path='/Watchlist' component={Watchlist}/>
        <Route path='/Portfolio' component={Portfolio}/>
        <Route path='/Historico' component={Historico}/>
      	<Route path='/SideBar' component={SideBar}/>
      	<Route path='/SideBarLogedin' component={SideBarLogedin}/>
        <Route path='/TabelaInicial' component={TabelaInicial}/>
        <Route path='/TabelaInvestimento' component={TabelaInvestimento}/>
        <Route path='/TabelaHistorico' component={TabelaHistorico}/>
        <Route exact path='/' component={Watchlist}/>
        <Route exact path='/' component={Historico}/>
        <Route exact path='/' component={Portfolio}/>
        <Route exact path='/' component={SideBar}/>
      	<Route exact path='/' component={SideBarLogedin}/>
        <Route exact path='/' component={TabelaInicial}/>
        <Route exact path='/' component={TabelaInvestimento}/>
        <Route exact path='/' component={TabelaHistorico}/>
      </Switch>
    </main>
  );
}

export default Main;