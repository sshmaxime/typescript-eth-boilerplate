# Typescript Ethereum Boilerplate

Make sure you have the right [requirements](https://hardhat.org/tutorial/setting-up-the-environment.html) installed for smart contracts on Ethereum.

In one terminal, start your hardhat node:

```bash
cd eth
yarn install
yarn hardhat
```

In another terminal, compile and deploy the contracts as well as creating the typechain interfaces:

```bash
cd eth
yarn build
yarn deploy
```

Link your projects with yarn to sync updates easily.

```bash
yarn link
```

### UI

To get started on the UI:

```bash
cd dapp
yarn install
yarn link eth
yarn start
```

Make sure you have [Metamask](https://metamask.io/) installed in your browser, and set it to connect to your local hardhat node (if necessary, create a new network, setting the URL to `http://localhost:8545` and the Chain ID to `31337`).
