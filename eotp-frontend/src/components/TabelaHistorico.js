import React from 'react';
import TabelaModelo from './common/TabelaModelo'

const histCol = [
{
  Header: "Ativo",
  accessor: "name"
},
{
  Header: "Valor Investido",
  accessor: "invested"
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
  Header: "Data Abertura",
  accessor: "data_open"
},
{
  Header: "Data Fecho",
  accessor: "data_close"
},
{
  Header: 'Valor Ganho/Perda ($)',
  accessor: 'gain_loss'
},
{
  Header: 'Percentagem Ganho/Perda (%)',
  accessor: 'percentage'
},];

class TabelaHistorico extends React.Component{
  render() {
    return(
      <div>
        <TabelaModelo data={[{}]}
          columns={histCol}
          />
      </div>
    );
  }
}

export default TabelaHistorico;