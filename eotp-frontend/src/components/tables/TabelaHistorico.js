import React from 'react';
import TabelaModelo from '../common/TabelaModelo'

const histCol = [
  {
    Header: "Ativo",
    accessor: "symbol"
  },
  {
    Header: "Valor Investido",
    accessor: "investment"
  },
  {
    Header: "Preço Fecho ($)",
    id: "close_price",
    accessor: "closePrice"
  },
  {
    Header: "Preço Abertura ($)",
    accessor: "openPrice"
  },
  {
    Header: "Data Abertura",
    accessor: "openData"
  },
  {
    Header: "Data Fecho",
    accessor: "closeData"
  },
  {
    Header: 'Valor Ganho/Perda ($)',
    accessor: 'gainloss'
  },
  {
    Header: 'Percentagem Ganho/Perda (%)',
    accessor: 'percentgl'
  },
];

class TabelaHistorico extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      token: this.props.token,
    };
  }

  async componentDidMount() {
    console.log(this.state.token);
    await fetch('http://localhost:4000/data/gethistorico', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: this.state.token,
      },
    }).then(async (res) => {
      if(!res.ok) {
        alert("Erro ao buscar historico!");
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
          columns={histCol}
          />
      </div>
    );
  }
}

export default TabelaHistorico;