import React from 'react'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentoService from '../../app/service/lancamentoService'

import { withRouter } from 'react-router-dom'
import * as messages from '../../components/toastr'
import LocalStorageService from '../../app/service/localstorageService'

class CadastroLancamentos extends React.Component{

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    handleChange = (event) => { 
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name]: value})
    }

    submit = () => {

        const usuarioLogado = LocalStorageService.buscarItem('_usuarioLogado');

        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id };

        try{
            this.service.validar(lancamento);
        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }


        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento salvo com sucesso.');
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    
    }

    atualizar = () => {
        const { descricao, valor, mes, ano, tipo, status, usuario, id } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, status, usuario, id };

        this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento atualizado com sucesso.');
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    componentDidMount(){
        const params = this.props.match.params
        if(params.id){
            this.service.obterPorId(params.id)
                .then(response => {
                    this.setState({...response.data, atualizando: true})
                }).catch(error => {
                    messages.mensagemErro(error.response.data)
                })
        }
    }

    render(){

        const tipos = this.service.obterTiposDeLancamento();
        const meses = this.service.obterListaMeses();

        return(
            <Card title={ this.state.atualizando ? 'Atualizar Lançamentos' : 'Cadastro de Lançamentos' }>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                            <input 
                                id="inputDescricao" 
                                type="text" 
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.handleChange}
                                className="form-control" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input 
                                id="inputAno" 
                                type="text" 
                                name="ano"
                                value={this.state.ano}
                                onChange={this.handleChange}
                                className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputMes" label="Mes: *">
                            <SelectMenu 
                                id="inputMes" 
                                name="mes"
                                value={this.state.mes}
                                onChange={this.handleChange}
                                className="form-control" 
                                lista={meses} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputValor" label="Valor: *">
                            <input 
                                id="inputValor" 
                                type="text" 
                                name="valor"
                                value={this.state.valor}
                                onChange={this.handleChange}
                                className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" label="Tipo: *">
                            <SelectMenu 
                                id="inputTipo" 
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleChange}
                                className="form-control" 
                                lista={tipos} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: *">,
                            <input 
                                htmlFor="inputStatus"
                                type="text" 
                                name="status"
                                value={this.state.status}
                                className="form-control"
                                disabled />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        {this.state.atualizando ?
                            (
                                <button 
                                    onClick={this.atualizar} 
                                    className="btn btn-primary">
                                        <i className="pi pi-refresh"></i> Atualizar
                                    </button>
                            ) : (
                                <button onClick={this.submit} 
                                        className="btn btn-success">
                                         <i className="pi pi-save"></i> Salvar
                                </button>
                            )
                        }
                        <button 
                            onClick={e => this.props.history.push('/consulta-lancamentos')} 
                            className="btn btn-danger">
                                 <i className="pi pi-times"></i> Cancelar
                        </button>
                    </div>
                </div>

            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos)