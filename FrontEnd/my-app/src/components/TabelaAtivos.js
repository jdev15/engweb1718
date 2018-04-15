import React from 'react';
import { Table, Row, Cell } from 'react-responsive-table';
import { Button } from 'react-bootstrap';
import './tabela.css';

class TabelaAtivos extends React.Component {

  deleteRow = (index) => {
    const newRows = this.state.rows.slice(0, index).concat(this.state.rows.slice(index + 1));
    this.setState({
      rows: newRows,
    });
  };

  render () {

    return (
  
        <div class="content-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <h1> Tabela de Ativos </h1>

<div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>Ativo</th>
                  <th>Close</th>
                  <th>Open</th>
                  <th>Sell</th>
                  <th>Buy</th>
                  <th>Invested</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td> <a href="#">AAPL</a> </td>
                    <td>325.60</td>
                    <td>325.96</td>
                    <td>321.77</td>
                    <td>321.99</td>
                    <td>100.00</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><a href="#">TSLA</a></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><a href="#">GOOGL</a></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                  </tr>
              </tbody>
            </table>
          </div>
                    </div>
          </div>
          </div>
      </div>
        </div>
    );
  }
}

export default TabelaAtivos;
