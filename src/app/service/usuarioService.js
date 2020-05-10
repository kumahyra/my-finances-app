import ApiService from '../apiservice'
import ErroValidacao from '../exception/ErroValidacao'

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios');
    }

    autenticar(usuario){
        return this.post('/autenticar', usuario);   
    }

    getSaldoDoUsuario(id){
        return this.get(`/${id}/saldo`);
    }

    salvar(usuario){
        return this.post('/', usuario);
    }

    validar(usuario){
        const erros = [];

        if(!usuario.nome){
            erros.push('O campo nome é obrigatório!')
        }

        if(!usuario.email){
            erros.push('O campo email é obrigatório!');
        }else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            erros.push('Email inválido! Informe um email válido.');
        }

        if(!usuario.senha || !usuario.senhaRepticao){
            erros.push('Favor, digite a senha duas vezes!');
        }

        if(usuario.senha !== usuario.senhaRepticao){
            erros.push('As senhas devem ser iguais!');
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }
}

export default UsuarioService