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
            </div>
        );
    }

}

export default Window;