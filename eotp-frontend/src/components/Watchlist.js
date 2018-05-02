import React from 'react';
//components
import SideBar from './SideBar';
import TopBar from './TopBar';
import TabelaInicial from './TabelaInicial';

class Watchlist extends React.Component {
  render() {
    return (
      <div>
      <SideBar />
      <TopBar />
      <TabelaInicial />
      </div>
      );
  }
}

export default Watchlist;