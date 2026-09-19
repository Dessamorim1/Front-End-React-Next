# Jogo de Dados (Expo / React Native)

Migração do [Jogo de Dados em Next.js](../jogo-dados) para Expo + React Native.

## Regras

- Partida entre **2 jogadores**, disputada em **5 rodadas**.
- Em cada rodada, cada jogador joga 2 dados (na sua vez, com o botão habilitado apenas para o jogador da vez).
- Vence a rodada quem tirar a maior soma dos dois dados; em caso de soma igual, a rodada é empatada.
- Após as 5 rodadas, vence a partida quem tiver a maior soma total de pontos; em caso de empate, o jogo é declarado empatado.
- Um botão **Jogar Novamente** reinicia a partida do zero.

## Estrutura

- `components/Dado.js` — recebe a prop `valor` (1 a 6) e exibe a imagem do dado correspondente (imagens em `assets/dados`).
- `components/JogoDados.js` — controla o estado do jogo (rodada atual, dados de cada jogador, placar, resultado da rodada e resultado final).
- `App.js` — ponto de entrada, renderiza `JogoDados`.

## Rodando o projeto

```bash
npm install
npx expo start
```

Escaneie o QR Code com o app **Expo Go** (Android/iOS) ou rode em um emulador com `npm run android` / `npm run ios`, ou no navegador com `npm run web`.

## Publicando uma atualização (Expo Updates / EAS Update)

```bash
npx eas login
npx eas update:configure
npx eas update --branch production --message "Jogo de dados"
```

Após publicar, use `npx eas update:list` (ou o painel em expo.dev) para obter o link/QR Code da atualização publicada.
