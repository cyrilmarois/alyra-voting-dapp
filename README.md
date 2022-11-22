# Welcome in alpha version of the voting Dapp

## Demo

You can check the video content on how it works [`here`](https://www.loom.com/share/b3dd2e74848b445cb85b113d1dadc9b6)

Check the demo [`here`](https://alyra-voting-dapp-akt4.vercel.app/)

You can check the `smart contract` at this [`address`](https://goerli.etherscan.io/address/0x9f6a50DE3ee8DFBcF19c16f75beA133F886E91Ec) . It has been deployed on `Goerli` test network.

The solidity compiler version is `0.8.17`

---

## Play with it on your local machine

### Requirements

- Ganache
- Metamask
- NodeJs

Please read the documentation on how to install `Ganache`, once it's installed and running on your local machine

```sh
$ > cd truffle
# Install Truffle dependencies
$ > npm install
$ > truffle migrate --reset --network development
```

Then, on the the client side

```sh
$ > cd client
# Install React dependencies
$ > npm install
$ > npm run start
Starting the client app...
```

It should runs the dapp on your 3000 local port [`http://localhost:3000/`](http://localhost:3000/)

---

# React Truffle Box

This box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

## Installation

First ensure you are in an empty directory.

Run the `unbox` command using 1 of 2 ways.

```sh
# Install Truffle globally and run `truffle unbox`
$ npm install -g truffle
$ truffle unbox react
```

```sh
# Alternatively, run `truffle unbox` via npx
$ npx truffle unbox react
```

Start the react dev server.

```sh
$ cd client
$ npm start
  Starting the development server...
```

From there, follow the instructions on the hosted React app. It will walk you through using Truffle and Ganache to deploy the `SimpleStorage` contract, making calls to it, and sending transactions to change the contract's state.

## FAQ

- **How do I use this with Ganache (or any other network)?**

  The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! Check out [our documentation on adding network configurations](https://trufflesuite.com/docs/truffle/reference/configuration/#networks). From there, you can run `truffle migrate` pointed to another network, restart the React dev server, and see the change take place.

- **Where can I find more resources?**

  This Box is a sweet combo of [Truffle](https://trufflesuite.com) and [Create React App](https://create-react-app.dev). Either one would be a great place to start!
