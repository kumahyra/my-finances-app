export default class LocalStorageService{
    static adicionarItem(chave, valor){
        localStorage.setItem(chave, JSON.stringify(valor));
    }

    static buscarItem(chave){
        return JSON.parse(localStorage.getItem(chave));
    }

    static removerItem(chave){
        localStorage.removeItem(chave);
    }
}
