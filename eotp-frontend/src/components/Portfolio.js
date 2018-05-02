import React from 'react';
//components
import SideBar from './common/SideBar';
import TopBar from './common/TopBar';
import TabelaInvestimento from './TabelaInvestimento';

class Portfolio extends React.Component {
  render() {
    return (
      <div>
      <SideBar />
      <TopBar />
      <TabelaInvestimento />
      </div>
      );
  }
}

export default Portfolio;