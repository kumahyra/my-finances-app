import React from 'react';

export default class App extends React.Component {
  state = {
    nome:  '',
    numero1: null,
    numero2: null,
    resultado: null
  }

  somar = () => {
    const resultado = parseInt(this.state.numero1) + parseInt(this.state.numero2)
    this.setState({resultado: resultado})
  }

  render(){
    return(
      <div>
        <label>Nome:</label>
        <input type="text" value={this.state.nome} 
          onChange={(event) => this.setState({nome: event.target.value})} />
        <br />
        o nome digitado foi: {this.state.nome}
        <br />
        <label>Numero 1:</label>
        <br />
        <input type="text" value={this.state.numero1}
          onChange={(e) => this.setState({numero1: e.target.value})} />
        <br />
        <label>Numero 2:</label>
        <br />
        <input type="text" value={this.state.numero2}
          onChange={(e) => {this.setState({numero2: e.target.value})}} />
         <br />
        <button 
          onClick={this.somar}>
            Somar
        </button>
        <br />
        O resultado é: {this.state.resultado}

      </div>
    )
  }
}