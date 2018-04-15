import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import SignIn from './SignIn'
import PageOne from './PageIndice.js'
import PageTwo from './PageTwo'
import PageThree from './PageThree'

class Index extends React.Component {

   constructor(props){
   	super(props);
   	this.state= {
   		logedIn: Number(this.props.logedIn) === 1
   	}
   }

  renderPageOne(props){
    return (
        <div>
          <PageOne {...props}/>
        </div>)
  }

  handleLogin(value){
  	this.setState({
  		logedIn:value
  	})
  }

  logedIn(){
    return this.logedIn;
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path='/SignIn' component={SignIn}/>
          <Route path='/Login' onLogin={(value) => this.handleLogin()} component={Login}/>
          <Route exact path='/' loggedIn={this.state.logedIn} render= { (props) => this.renderPageOne(props) }/>
          <Route path='/' component={PageTwo}/>
          <Route path='/' component={PageThree}/>
        </Switch>
      </div>
    );
  }
}

export default Index;
