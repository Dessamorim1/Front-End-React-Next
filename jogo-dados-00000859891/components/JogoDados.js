import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dado } from "./Dado";

const TOTAL_RODADAS = 5;
const VALOR_INICIAL_DADO = 1;

function sortearDado() {
  return Math.floor(Math.random() * 6) + 1;
}

export function JogoDados() {
  const [vezJogador, setVezJogador] = useState(1);
  const [rodada, setRodada] = useState(0);

  const [dadoJogador1A, setDadoJogador1A] = useState(VALOR_INICIAL_DADO);
  const [dadoJogador1B, setDadoJogador1B] = useState(VALOR_INICIAL_DADO);
  const [dadoJogador2A, setDadoJogador2A] = useState(VALOR_INICIAL_DADO);
  const [dadoJogador2B, setDadoJogador2B] = useState(VALOR_INICIAL_DADO);

  const [totalRodadaJ1, setTotalRodadaJ1] = useState(0);
  const [totalRodadaJ2, setTotalRodadaJ2] = useState(0);

  const [resultadoRodada, setResultadoRodada] = useState(null);

  const [placarJ1, setPlacarJ1] = useState(0);
  const [placarJ2, setPlacarJ2] = useState(0);

  const jogoAcabou = rodada >= TOTAL_RODADAS;

  function jogarJogador1() {
    const valorA = sortearDado();
    const valorB = sortearDado();
    const total = valorA + valorB;

    setDadoJogador1A(valorA);
    setDadoJogador1B(valorB);
    setTotalRodadaJ1(total);
    setResultadoRodada(null);
    setVezJogador(2);
    setPlacarJ1((placar) => placar + total);
  }

  function jogarJogador2() {
    const valorA = sortearDado();
    const valorB = sortearDado();
    const total = valorA + valorB;

    setDadoJogador2A(valorA);
    setDadoJogador2B(valorB);
    setTotalRodadaJ2(total);
    setPlacarJ2((placar) => placar + total);

    if (totalRodadaJ1 > total) {
      setResultadoRodada(1);
    } else if (total > totalRodadaJ1) {
      setResultadoRodada(2);
    } else {
      setResultadoRodada(0);
    }

    setVezJogador(1);
    setRodada((r) => r + 1);
  }

  function jogarNovamente() {
    setVezJogador(1);
    setRodada(0);
    setDadoJogador1A(VALOR_INICIAL_DADO);
    setDadoJogador1B(VALOR_INICIAL_DADO);
    setDadoJogador2A(VALOR_INICIAL_DADO);
    setDadoJogador2B(VALOR_INICIAL_DADO);
    setTotalRodadaJ1(0);
    setTotalRodadaJ2(0);
    setResultadoRodada(null);
    setPlacarJ1(0);
    setPlacarJ2(0);
  }

  function textoResultadoRodada() {
    if (resultadoRodada === 1) {
      return `Jogador 1 Ganhou (${totalRodadaJ1} x ${totalRodadaJ2})`;
    }
    if (resultadoRodada === 2) {
      return `Jogador 2 Ganhou (${totalRodadaJ2} x ${totalRodadaJ1})`;
    }
    return `Empatou (${totalRodadaJ1} x ${totalRodadaJ2})`;
  }

  function textoResultadoFinal() {
    if (placarJ1 > placarJ2) {
      return `Jogador 1 venceu a partida com ${placarJ1} pontos!`;
    }
    if (placarJ2 > placarJ1) {
      return `Jogador 2 venceu a partida com ${placarJ2} pontos!`;
    }
    return `Empate geral! Ambos fizeram ${placarJ1} pontos.`;
  }

  if (jogoAcabou) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Fim de jogo!</Text>
        <Text style={styles.resultadoFinal}>{textoResultadoFinal()}</Text>
        <Text style={styles.placarFinal}>
          Placar final: J1 {placarJ1} x {placarJ2} J2
        </Text>
        <TouchableOpacity style={styles.botao} onPress={jogarNovamente}>
          <Text style={styles.textoBotao}>Jogar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Rodada {rodada + 1} de {TOTAL_RODADAS}</Text>
      <Text style={styles.placar}>
        Placar: J1 {placarJ1} x {placarJ2} J2
      </Text>

      <View style={styles.jogadores}>
        <View style={styles.coluna}>
          <Text style={styles.nomeJogador}>Jogador 1</Text>
          <View style={styles.dados}>
            <Dado valor={dadoJogador1A} />
            <Dado valor={dadoJogador1B} />
          </View>
          <TouchableOpacity
            style={[styles.botao, vezJogador !== 1 && styles.botaoDesabilitado]}
            disabled={vezJogador !== 1}
            onPress={jogarJogador1}
          >
            <Text style={styles.textoBotao}>Jogar os dados</Text>
          </TouchableOpacity>
          <Text style={styles.totalRodada}>Total: {totalRodadaJ1}</Text>
        </View>

        <View style={styles.coluna}>
          <Text style={styles.nomeJogador}>Jogador 2</Text>
          <View style={styles.dados}>
            <Dado valor={dadoJogador2A} />
            <Dado valor={dadoJogador2B} />
          </View>
          <TouchableOpacity
            style={[styles.botao, vezJogador !== 2 && styles.botaoDesabilitado]}
            disabled={vezJogador !== 2}
            onPress={jogarJogador2}
          >
            <Text style={styles.textoBotao}>Jogar os dados</Text>
          </TouchableOpacity>
          <Text style={styles.totalRodada}>Total: {totalRodadaJ2}</Text>
        </View>
      </View>

      {resultadoRodada !== null && (
        <Text style={styles.resultadoRodada}>
          Resultado da rodada {rodada}: {textoResultadoRodada()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  placar: {
    fontSize: 16,
    marginBottom: 24,
  },
  jogadores: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  coluna: {
    alignItems: "center",
    flex: 1,
  },
  nomeJogador: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  dados: {
    flexDirection: "row",
    marginBottom: 12,
  },
  botao: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  botaoDesabilitado: {
    backgroundColor: "#9ca3af",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "600",
  },
  totalRodada: {
    fontSize: 14,
  },
  resultadoRodada: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  resultadoFinal: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  placarFinal: {
    fontSize: 16,
    marginBottom: 24,
  },
});
