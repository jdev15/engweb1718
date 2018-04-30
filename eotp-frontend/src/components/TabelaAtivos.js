import React from 'react';
import { Table, Row, Cell } from 'react-responsive-table';
//css
import '../css/TabelaAtivos.css';
import PageIndice from './PageIndice.js';

//com possibilidade de nao usar react-responsive-table
class TabelaAtivos extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <div>
          <PageIndice isLoggedIn={ this.props.isLoggedIn} />
        </div>
    )
  }

 /* render() {
    return (
      <div>
        <Table>
          <Row>
            <Cell>Ativo</Cell>
            <Cell>Nome</Cell>
            <Cell>Preço ($)</Cell>
            <Cell>Compra ($)</Cell>
            <Cell>Venda ($)</Cell>
          </Row>
          {this.props.tableInfo.map(function(item, key) {
            return(
              <Row>
                <Cell>{item.symbol}</Cell>
                <Cell>{item.companyName}</Cell>
                <Cell>{item.latestPrice}</Cell>
                <Cell>{item.iexBidPrice}</Cell>
                <Cell>{item.iexAskPrice}</Cell>
              </Row>
            );
          })}
        </Table>
      </div>
    );
  }*/
}

export default TabelaAtivos;
