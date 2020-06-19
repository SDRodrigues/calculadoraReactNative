import React from 'react';
import {StyleSheet, View} from 'react-native';
import Botao from "./src/components/Botao";
import Display from "./src/components/Tela";

let estadoInicial = {
  valorNaTela: '0',
  limpaTela: false,
  operacao: null,
  valores: [0, 0],
  valorAtual: 0,
}

  export default class App extends React.Component {
    state = { ...estadoInicial };

    seleciona = (valor: string) => {
      let limpartTela = this.state.valorNaTela === '0' || this.state.limpaTela;
      if (valor === '.' && !limpartTela && this.state.valorNaTela.includes('.')) {
        return;
      }
      let valorAtual = limpartTela ? '' : this.state.valorNaTela;
      let valorNaTela = valorAtual + valor;
      this.setState({ valorNaTela: valorNaTela, limpaTela: false });
      if (valor !== '.') {
        let novoValor = parseFloat(valorNaTela);
        let valores = [...this.state.valores];
        valores[this.state.valorAtual] = novoValor;
        this.setState({ valores: valores });
      }
    }

    limpar = () => {
      this.setState({ ...estadoInicial });
    }

    operacao = (operador: string) => {
      if (this.state.valorAtual === 0) {
        this.setState({ operacao: operador, valorAtual: 1, limpaTela: true });
      } else {
        let igual = operador === '=';
        let valores = [...this.state.valores];
        try {
          valores[0] = eval(`${valores[0]} ${this.state.operacao} ${valores[1]}`);
        } catch (e) {
          valores[0] = this.state.valores[0];
        }
        valores[1] = 0;
        this.setState({
          valorNaTela: `${valores[0]}`,
          operacao: igual ? null : operador,
          valorAtual: igual ? 0 : 1,
          limpaTela: true,
          values: valores,
        })
      }
    }

  render() {
    return (
        <View style={styles.container}>
          <Display valor={this.state.valorNaTela} />
          <View style={styles.botoes}>
            <Botao campo='7' onClick={this.seleciona} />
            <Botao campo='8' onClick={this.seleciona} />
            <Botao campo='9' onClick={this.seleciona} />
            <Botao campo='AC' onClick={this.limpar} />
            <Botao campo='4' onClick={this.seleciona} />
            <Botao campo='5' onClick={this.seleciona} />
            <Botao campo='6' onClick={this.seleciona} />
            <Botao campo='/' onClick={this.operacao} />
            <Botao campo='1' onClick={this.seleciona} />
            <Botao campo='2' onClick={this.seleciona} />
            <Botao campo='3' onClick={this.seleciona} />
            <Botao campo='*' onClick={this.operacao} />
            <Botao campo='0' onClick={this.seleciona} />
            <Botao campo='.' onClick={this.seleciona} />
            <Botao campo='-' onClick={this.operacao} />
            <Botao campo='=' onClick={this.operacao} />
            <Botao campo='+' onClick={this.operacao} />
          </View>
        </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  botoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
