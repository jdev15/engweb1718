import React from 'react';
//components
import SideBar from './common/SideBar';
import TopBar from './common/TopBar';
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