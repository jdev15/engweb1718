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
            isLoggedIn: false
        }
        this.changeLoggedIn = this.changeLoggedIn.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
    }

    isLoggedIn() {
        console.log("Check value");
        return this.state.isLoggedIn;
    }

    changeLoggedIn() {
        console.log("Change log in");
        this.setState({
            isLoggedIn: !this.state.isLoggedIn
        });
    }


    render() {
        return (
            <div>
                <SideBar isLoggedIn={this.isLoggedIn} handle={this.changeLoggedIn}/>
                <TopBar isLoggedIn={this.isLoggedIn} handle={this.changeLoggedIn}/>
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