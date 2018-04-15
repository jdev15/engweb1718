import React from 'react';

import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

class Description extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.state = {
      showModal: false,
      ativo: '',
      description: 'description',
      values: 'values',
      history: 'history',
      tabIndex: 0,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  levantamento(l) {
    this.setState({ levantar: l });
  }

  deposito(d) {
    this.setState({ depositar: d });
  }

  render() {

    return (
      <div>

        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
        Abrir Descrição
        
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Descrição do Ativo</Modal.Title>

          </Modal.Header>
          <Modal.Body>
            <h2>Google</h2>

          <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
            <TabList>
              <Tab>Descrição</Tab>
              <Tab>Valores de Mercado</Tab>
              <Tab>Histórico</Tab>
            </TabList>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </Tabs>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Fechar</Button>
          </Modal.Footer>
        </Modal>

      </div>      
    );
  }

}

export default Description;
