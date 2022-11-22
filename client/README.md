# Welcome in alpha version of the voting Dapp

You can check the video content on how it works [`here`](https://www.loom.com/share/db7cd09889bb43fca1d640257b492c72)

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

```
$ > cd truffle
$ > npm install
$ > truffle migrate --reset --network development
```

Then, on the the client side

```
$ > cd client
$ > npm install
$ > npm run start
```

It should runs the dapp on your 3000 local port [`http://localhost:3000/`](http://localhost:3000/)
