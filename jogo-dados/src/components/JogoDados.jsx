"use client";

import { useState } from "react";
import { Dado } from "./Dado";

export function JogoDados() {
    const inicialdadoJogador = 1;
    const inicialVezJogador = 1;
    const inicialRodada = 0;
    const tot = 0;
    const res = 0;

    const [vezJogador, setvezjogador] = useState(inicialVezJogador);

    const [dadoJogador1A, setdadoJogador1A] = useState(inicialdadoJogador);
    const [dadoJogador1B, setdadoJogador1B] = useState(inicialdadoJogador);

    const [dadoJogador2A, setdadoJogador2A] = useState(inicialdadoJogador);
    const [dadoJogador2B, setdadoJogador2B] = useState(inicialdadoJogador);

    const [rodadas, setRodada] = useState(inicialRodada);

    const [totalRodadasJ1, setTotRodadasJ1] = useState(tot);
    const [totalRodadasJ2, setTotRodadasJ2] = useState(tot);

    const [resultadoRodada, setResultadoRodada] = useState(res);

    const [totalFinalJ1, setTotalFinalJ1] = useState(tot);
    const [totalFinalJ2, setTotalFinalJ2] = useState(tot);

    const [somaTotalJ1, setSomaTotalJ1] = useState(tot);
    const [somaTotalJ2, setSomaTotalJ2] = useState(tot);

    return (

        <div>
            {rodadas < 5 && (
                <div className="totCot">
                    <div className="container text-center">
                        <h1>Rodada {rodadas + 1} de 5</h1>
                        <p>Placar: J1 {somaTotalJ1} x {somaTotalJ2} J2</p>
                        <div className="row align-items-start">
                            <div className="col">
                                <p>Dados do Jogador 1</p>
                                <Dado valor={dadoJogador1A} />
                                <Dado valor={dadoJogador1B} />

                                <button disabled={vezJogador !== 1 || rodadas === 5} onClick={() => {
                                    const valorJ1A = Math.floor(Math.random() * 6) + 1;
                                    const valorJ1B = Math.floor(Math.random() * 6) + 1;

                                    setdadoJogador1A(valorJ1A);
                                    setdadoJogador1B(valorJ1B);

                                    setvezjogador(2);
                                    const totalJ1 = valorJ1A + valorJ1B;
                                    setTotRodadasJ1(totalJ1);
                                    setSomaTotalJ1(t => t + totalJ1);
                                }}>Jogar os dados</button>
                                <p>Total rodada: {totalRodadasJ1}</p>
                            </div>
                            <div className="col">
                                <p>Dados do Jogador 2</p>
                                <Dado valor={dadoJogador2A} />
                                <Dado valor={dadoJogador2B} />

                                <button disabled={vezJogador !== 2 || rodadas === 5} onClick={() => {
                                    const valorJ2A = Math.floor(Math.random() * 6) + 1;
                                    const valorJ2B = Math.floor(Math.random() * 6) + 1;

                                    setdadoJogador2A(valorJ2A);
                                    setdadoJogador2B(valorJ2B);

                                    setvezjogador(1);
                                    const totalJ2 = valorJ2A + valorJ2B;
                                    setTotRodadasJ2(totalJ2);
                                    setRodada(prev => prev + 1);

                                    if (totalRodadasJ1 > totalJ2) {
                                        setResultadoRodada(1);
                                    } else if (totalJ2 > totalRodadasJ1) {
                                        setResultadoRodada(2);
                                    } else {
                                        setResultadoRodada(0);
                                    }

                                    setTotalFinalJ1(totalRodadasJ1);
                                    setTotalFinalJ2(totalJ2);
                                    setSomaTotalJ2(t => t + totalJ2);

                                }}>Jogar os dados</button>
                                <p>Total rodada: {totalRodadasJ2}</p>
                            </div>
                        </div>
                        {rodadas >= 1 && (
                            <div className="col">Resultado da rodada {rodadas}: {
                                resultadoRodada === 1
                                    ? <> Jogador 1 Venceu com o total de {totalFinalJ1} pontos e o Jogador 2 Perdeu com {totalFinalJ2} pontos!</>
                                    : resultadoRodada === 2
                                        ? <>Jogador 2 Venceu com o total de {totalFinalJ2} e o Jogador 1 Perdeu com {totalFinalJ1} pontos!</>
                                        : "Empate"
                            } </div>
                        )}
                    </div >
                </div>
            )}
            {rodadas === 5 && (
                <div className="resultado-final">

                    {
                        somaTotalJ1 > somaTotalJ2
                            ? <>O jogador 1 venceu com o total de {somaTotalJ1} pontos!</>
                            : somaTotalJ2 > somaTotalJ1
                                ? <>O jogador 2 venceu com o total de {somaTotalJ2} pontos!</>
                                : <>Empate! Ambos fizeram {somaTotalJ1} pontos!</>
                    }

                    <br /><br />

                    <button onClick={() => {
                        setRodada(inicialRodada);
                        setTotRodadasJ1(tot);
                        setTotRodadasJ2(tot);
                        setdadoJogador1A(inicialdadoJogador);
                        setdadoJogador1B(inicialdadoJogador);
                        setdadoJogador2A(inicialdadoJogador);
                        setdadoJogador2B(inicialdadoJogador);
                        setResultadoRodada(res);
                        setvezjogador(inicialVezJogador);
                        setTotalFinalJ1(tot);
                        setTotalFinalJ2(tot);
                        setSomaTotalJ1(tot);
                        setSomaTotalJ2(tot);
                    }}>
                        Jogar novamente
                    </button>

                </div>
            )}

        </div>
    );
}