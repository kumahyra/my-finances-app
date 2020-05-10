import LocalStorageService from './localstorageService';
export const USUARIO_LOGADO = '_usuarioLogado';

export default class AuthService{
    static isUsuarioAutenticado(){
        const usuario = LocalStorageService.buscarItem(USUARIO_LOGADO);
        return usuario && usuario.id;
    }

    static removerUsuarioAutenticado(){
        LocalStorageService.removerItem(USUARIO_LOGADO);
    }

    static logar(usuario){
        LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario);
    }

    static obterUsuarioAutenticado(){
        return LocalStorageService.buscarItem(USUARIO_LOGADO);
    }
}