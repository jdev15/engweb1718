import React from 'react';
import { Button } from 'reactstrap';
import Dollar from 'react-icons/lib/fa/dollar';
import TabelaModelo from '../common/TabelaModelo.js'


const invCol = [
{
  Header: "Ativo",
  accessor: "symbol"
},
{
  Header: 'Unidades Adquiridas',
  accessor: 'units'
},
{
  Header: "Valor Investido",
  accessor: "investment"
},
{
  Header: "Preço Original ($)",
  accessor:"value"
},
{
  Header: 'Ganho/Perda ($)',
  accessor: 'gain_loss'
},
{
  Header: 'Percentagem Ganho/Perda (%)',
  accessor: 'percentage'
},
{
  Header: "Fechar Posição",
  Cell: row => (
      <Button color="primary" onClick={()=> {this.updateState(row.original);}}><Dollar /></Button>
  ),
  sortable: false,
  style:{overflow:'visible'},
}];

class TabelaInvestimento extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      token: this.props.token,
    };
  }

  

  async componentDidMount() {
    console.log(this.state.token);
    await fetch('http://localhost:4000/data/getportfolio', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: this.state.token,
      },
    }).then(async (res) => {
      if(!res.ok) {
        alert("Erro ao buscar portfolio!");
        const test = await res.json();
        console.log(res);
        console.log(test);
      }
      else {
        const values = await res.json();
        this.setState({
          data: values.data,
        })
      }
    })
  }

  render() {
    return(
    <div>
      <TabelaModelo data={this.state.data}
                  columns={invCol} />
    </div>
    );
  }
}

export default TabelaInvestimento;