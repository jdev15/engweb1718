import React from 'react';
import Main from './components/Main';
import SideBar from './components/common/SideBar';
import TopBar from './components/common/TopBar';

class App extends React.Component {
  state = {
    
  }

  render() {
    return (
      <div>
      <SideBar />
      <TopBar />
      <Main />
      </div>
      );
    }
  }

  export default App;