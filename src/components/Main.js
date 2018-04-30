import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import SignIn from './SignIn'
import PageOne from './PageOne'
import PageTwo from './PageTwo'
import PageThree from './PageThree'

class Main extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route path='/SignIn' component={SignIn}/>
          <Route path='/Login' component={Login}/>
          <Route exact path='/' component={PageOne}/>
          <Route exact path='/' component={PageTwo}/>
          <Route exact path='/' component={PageThree}/>
        </Switch>
      </main>
    );
  }
}

export default Main;
