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
    state = { ...estadoInicial }

    seleciona = (valor: string) => {
      const limpartTela = this.state.valorNaTela === '0' || this.state.limpaTela;
      if (valor === '.' && !limpartTela && this.state.valorNaTela.includes('.')) {
        return;
      }
      const valorAtual = limpartTela ? '' : this.state.valorNaTela;
      const valorNaTela = valorAtual + valor;
      this.setState({ valorNaTela: valorNaTela, limpaTela: false });
      if (valor !== '.') {
        const novoValor = parseFloat(valorNaTela);
        const valores = [...this.state.valores];
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
        const equals = operador === '=';
        const values = [...this.state.valores];
        try {
          values[0] = eval(`${values[0]} ${this.state.operacao} ${values[1]}`);
        } catch (e) {
          values[0] = this.state.valores[0];
        }
        values[1] = 0;
        this.setState({
          valorNaTela: `${values[0]}`,
          operacao: equals ? null : operador,
          valorAtual: equals ? 0 : 1,
          limpaTela: true,
          values,
        })
      }
    }

  render() {
    return (
        <View style={styles.container}>
          <Display valor={this.state.valorNaTela} />
          <View style={styles.botoes}>
            <Botao campo='AC'  onClick={this.limpar} />
            <Botao campo='/'  onClick={this.operacao} />
            <Botao campo='7' onClick={this.seleciona} />
            <Botao campo='8' onClick={this.seleciona} />
            <Botao campo='9' onClick={this.seleciona} />
            <Botao campo='*'   onClick={this.operacao} />
            <Botao campo='4' onClick={this.seleciona} />
            <Botao campo='5' onClick={this.seleciona} />
            <Botao campo='6' onClick={this.seleciona} />
            <Botao campo='-'  onClick={this.operacao} />
            <Botao campo='1' onClick={this.seleciona} />
            <Botao campo='2' onClick={this.seleciona} />
            <Botao campo='3' onClick={this.seleciona} />
            <Botao campo='+'  onClick={this.operacao} />
            <Botao campo='0'   onClick={this.seleciona} />
            <Botao campo='.' onClick={this.seleciona} />
            <Botao campo='='  onClick={this.operacao} />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  botoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
