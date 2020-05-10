import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import {withRouter} from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import * as message from '../components/toastr'

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepticao: ''

    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () =>{
        const { nome, email, senha, senhaRepticao } = this.state;
        const usuario = { nome, email, senha, senhaRepticao }

        try{
            this.service.validar(usuario);
        }catch(erros){
            const mensagens = erros.mensagens;

            mensagens.forEach(msg => message.mensagemErro(msg));
            return false;
        }

        this.service.salvar(usuario)
            .then(response => {
                message.mensagemSucesso('Usuário cadastrador com sucesso! Favor, realize o login.');
                this.props.history.push('/login');
            }).catch(error => {
                message.mensagemErro(error.response.data)
            })
    }

    cancelar = () =>{
        this.props.history.push('/login')
    }

    render(){
        return(
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" 
                                    id="inputNome" 
                                    name="nome" 
                                    className="form-control"
                                    onChange={e => this.setState({nome: e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email" 
                                    id="inputEmail" 
                                    name="email" 
                                    className="form-control"
                                    onChange={e => this.setState({email: e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password" 
                                    id="inputSenha" 
                                    name="senha" 
                                    className="form-control"
                                    onChange={e => this.setState({senha: e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password" 
                                    id="inputRepitaSenha" 
                                    name="senhaRepticao" 
                                    className="form-control"
                                    onChange={e => this.setState({senhaRepticao: e.target.value})}/>
                            </FormGroup>

                            <button 
                                onClick={this.cadastrar} 
                                className="btn btn-success">
                                     <i className="pi pi-save"></i> Salvar
                                </button>
                            <button 
                                onClick={this.cancelar} 
                                    className="btn btn-danger">
                                        <i className="pi pi-times"></i> Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter( CadastroUsuario )
