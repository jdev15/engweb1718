import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../css/window.css'
import 'bootstrap/dist/css/bootstrap.css';

class Window extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            levantar: '',
            depositar: '',
            investimento: '',
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        console.log(e);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    /*
    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.props.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }*/

    render(){
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.props.toggle}>
                        Gestão do Plafond
                    </ModalHeader>
                    <ModalBody>
                        <h4>Levantamento de fundos</h4>
                        <h5>Selecione abaixo a quantia que pretende levantar do plafond disponível</h5>
                        <p>
                            <input
                                name="levantar"
                                type="text"
                                placeholder="Quantia"
                                onChange = {e => this.onChange(e)}
                                value = {this.state.levantar}
                            /> €
                        </p>
                        <Button onClick={this.props.toggle}>Levantar</Button>
                        <h4>Depósito de fundos</h4>
                        <h5>Selecione abaixo a quantia que pretende depositar na sua conta</h5>
                        <p>
                            <input
                                name="depositar"
                                type="text"
                                placeholder="Quantia"
                                onChange = {e => this.onChange(e)}
                                value = {this.state.depositar}
                            /> €
                        </p>
                        <Button onClick={this.props.toggle}>Depositar</Button>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.props.toggle}>Fechar</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>
                        Abertura de Posições
                        <a href="about:blank" title="Informações" data-toggle="popover" data-trigger="hover" data-content="A abertura de posições está dependente do saldo monetário presente à data da abertura."><i className="fa fa-info">Info</i>
                        </a>
                    </ModalHeader>
                    <ModalBody>
                        <h2>TESLA INC (-0.98%)</h2>
                        <p>
                            <input
                                name="modalidade"
                                type="text"
                                placeholder="Quantia"
                                onChange = {e => this.onChange(e)}
                            /> €
                        </p>
                        <h5>Indique abaixo a quantia que pretende investir</h5>
                        <p>
                            <input
                                name="investimento"
                                type="text"
                                placeholder="Quantia"
                                onChange = {e => this.onChange(e)}
                                value = {this.state.investimento}
                            /> €
                        </p>
                        <h5>Quantia baseada no valor atual de mercado: 175€</h5>
                        <hr/>
                        <h6>Os valores considerados serão aqueles que constem do mercado no momento da abertura da posição, ou no momento em que o mesmo abrir.</h6><br/><br/>
                        <Button onClick={this.close}>Abrir Posição</Button>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.close}>Fechar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}

export default Window;