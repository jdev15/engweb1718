import React from 'react';
//components
import SideBar from './SideBar';
import TopBar from './TopBar';
import TabelaHistorico from './TabelaHistorico';

class Historico extends React.Component {
  render() {
    return (
      <div>
      <SideBar />
      <TopBar />
      <TabelaHistorico />
      </div>
      );
  }
}

export default Historico;