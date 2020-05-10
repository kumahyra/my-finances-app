import toastr from 'toastr'

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  export function exibirMesagem(titulo, mensagem, tipo){
    // tipo: success, info, warning, error
    toastr[tipo](mensagem, titulo)
  }

  export function mensagemErro(mensagem){
      exibirMesagem('Erro!', mensagem, 'error')
  }

  export function mensagemSucesso(mensagem){
    exibirMesagem('Sucesso', mensagem, 'success')
  }

  export function mensagemAlerta(mensagem){
    exibirMesagem('Alerta', mensagem, 'warning')
  }
