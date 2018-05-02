import React from 'react';
//components
import SideBar from './SideBar';
import TopBar from './TopBar';
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