import ApiService from '../apiservice'
import ErroValidacao from '../exception/ErroValidacao'

export default class LancamentoService extends ApiService{
    constructor(){
        super('/api/lancamentos');
    }

    consultar(lancamentoFiltro){

        let params = `?ano=${lancamentoFiltro.ano}`;
        
        if(lancamentoFiltro.mes){
            params = `${params}&mes=${lancamentoFiltro.mes}`;
        }

        if(lancamentoFiltro.tipo){
            params = `${params}&tipo=${lancamentoFiltro.tipo}`;
        }

        if(lancamentoFiltro.status){
            params = `${params}&status=${lancamentoFiltro.status}`;
        }

        if(lancamentoFiltro.usuario){
            params = `${params}&usuario=${lancamentoFiltro.usuario}`;
        }

        if(lancamentoFiltro.descricao){
            params = `${params}&descricao=${lancamentoFiltro.descricao}`;
        }


        return this.get(params);
    }

    validar(lancamento){
        const erros = [];

        if(!lancamento.ano){
            erros.push('Favor, informe o ano!');
        }

        if(!lancamento.mes){
            erros.push('Favor, informe o mês!');
        }

        if(!lancamento.descricao){
            erros.push('Favor, informe a descrição!');
        }

        if(!lancamento.tipo){
            erros.push('Favor, informe o tipo!');
        }

        if(!lancamento.valor){
            erros.push('Favor, informe o valor!');
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    salvar(lancamento){
        return this.post('/', lancamento);
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento);
    }

    deletar(id){
        return this.delete(`/${id}`);
    }

    alterarStatus(id, status){
        return this.put(`/${id}/atualizar-status`, { status })
    }

    obterListaMeses(){
        return [
            {label: 'Selecione...', value: ''},
            {label: 'Janeiro',      value: 1},
            {label: 'Fevereiro',    value: 2},
            {label: 'Março',        value: 3},
            {label: 'Abril',        value: 4},
            {label: 'Maio',         value: 5},
            {label: 'Junho',        value: 6},
            {label: 'Julho',        value: 7},
            {label: 'Agosto',       value: 8},
            {label: 'Setembro',     value: 9},
            {label: 'Outubro',      value: 10},
            {label: 'Novembro',     value: 11},
            {label: 'Dezembro',     value: 12}
        ];
    }

    obterTiposDeLancamento(){
        return [
            {label: 'Selecione...', value: ''},
            {label: 'Receita', value: 'RECEITA'},
            {label: 'Despesa', value: 'DESPESA'}
        ];
    }
}