import React from 'react';
import TabelaModelo from './common/TabelaModelo.js'


const invCol = [
{
  Header: "Ativo",
  accessor: "name"
},
{
  Header: "Preço Fecho ($)",
  id: "close_price",
  accessor: "close_price"
},
{
  Header: "Preço Abertura ($)",
  accessor: "open_price"
},
{
  Header: 'Unidades Adquiridas',
  accessor: 'units'
},
{
  Header: "Preço de Venda ($)",
  accessor:"sell_price"
},{
  Header: "Preço de Compra ($)",
  id: "precocompra",
  accessor: d => (d.sell_price * 1.02).toFixed(2)
},{
  Header: "Valor Investido",
  accessor: "invested"
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
  accessor: "invested",
  maxWidth: 120
}];

class TabelaInvestimento extends React.Component {
  render() {
    return(
    <div>
      <TabelaModelo data={[{
                  name:"APPLE",
                  close_price:"325.6",
                  open_price:"325.96",
                  sell_price: "321.77",
                  invested: "100"}]}
                  columns={invCol} />
    </div>
    );
  }
}

export default TabelaInvestimento;