import React, { useReducer, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(async (artifact) => {
    if (artifact) {
      // const web3 = new Web3("HTTP://127.0.0.1:8545");
      // const id = await web3.eth.net.getId();
      // const deployedNetwork = Mycontract.networks[id];

      // const voting = new web3.eth.Contract(
      //   Mycontract.abi,
      //   deployedNetwork.address
      // );
      // const abi = [
      //   {
      //     anonymous: false,
      //     inputs: [
      //       {
      //         indexed: true,
      //         internalType: "address",
      //         name: "previousOwner",
      //         type: "address",
      //       },
      //       {
      //         indexed: true,
      //         internalType: "address",
      //         name: "newOwner",
      //         type: "address",
      //       },
      //     ],
      //     name: "OwnershipTransferred",
      //     type: "event",
      //   },
      //   {
      //     anonymous: false,
      //     inputs: [
      //       {
      //         indexed: false,
      //         internalType: "uint256",
      //         name: "proposalId",
      //         type: "uint256",
      //       },
      //     ],
      //     name: "ProposalRegistered",
      //     type: "event",
      //   },
      //   {
      //     anonymous: false,
      //     inputs: [
      //       {
      //         indexed: false,
      //         internalType: "address",
      //         name: "voter",
      //         type: "address",
      //       },
      //       {
      //         indexed: false,
      //         internalType: "uint256",
      //         name: "proposalId",
      //         type: "uint256",
      //       },
      //     ],
      //     name: "Voted",
      //     type: "event",
      //   },
      //   {
      //     anonymous: false,
      //     inputs: [
      //       {
      //         indexed: false,
      //         internalType: "address",
      //         name: "voterAddress",
      //         type: "address",
      //       },
      //     ],
      //     name: "VoterRegistered",
      //     type: "event",
      //   },
      //   {
      //     anonymous: false,
      //     inputs: [
      //       {
      //         indexed: false,
      //         internalType: "enum Voting.WorkflowStatus",
      //         name: "previousStatus",
      //         type: "uint8",
      //       },
      //       {
      //         indexed: false,
      //         internalType: "enum Voting.WorkflowStatus",
      //         name: "newStatus",
      //         type: "uint8",
      //       },
      //     ],
      //     name: "WorkflowStatusChange",
      //     type: "event",
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: "string",
      //         name: "_desc",
      //         type: "string",
      //       },
      //     ],
      //     name: "addProposal",
      //     outputs: [],
      //     stateMutability: "nonpayable",
      //     type: "function",
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: "address",
      //         name: "_addr",
      //         type: "address",
      //       },
      //     ],
      //     name: "addVoter",
      //     outputs: [],
      //     stateMutability: "nonpayable",
      //     type: "function",
      //   },
      //   {
      //     inputs: [],
      //     name: "endProposalsRegistering",
      //     outputs: [],
      //     stateMutability: "nonpayable",
      //     type: "function",
      //   },
      //   {
      //     inputs: [],
      //     name: "endVotingSession",
      //     outputs: [],
      //     stateMutability: "nonpayable",
      //     type: "function",
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: "uint256",
      //         name: "_id",
      //         type: "uint256",
      //       },
      //     ],
      //     name: "getOneProposal",
      //     outputs: [
      //       {
      //         components: [
      //           {
      //             internalType: "string",
      //             name: "description",
      //             type: "string",
      //           },
      //           {
      //             internalType: "uint256",
      //             name: "voteCount",
      //             type: "uint256",
      //           },
      //         ],
      //         internalType: "struct Voting.Proposal",
      //         name: "",
      //         type: "tuple",
      //       },
      //     ],
      //     stateMutability: "view",
      //     type: "function",
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: "address",
      //         name: "_addr",
      //         type: "address",
      //       },
      //     ],
      //     name: "getVoter",
      //     outputs: [
      //       {
      //         components: [
      //           {
      //             internalType: "bool",
      //             name: "isRegistered",
      //             type: "bool",
      //           },
      //           {
      //             internalType: "bool",
      //             name: "hasVoted",
      //             type: "bool",
      //           },
      //           {
      //             internalType: "uint256",
      //             name: "votedProposalId",
      //             type: "uint256",
      //           },
      //         ],
      //         internalType: "struct Voting.Voter",
      //         name: "",
      //         type: "tuple",
      //       },
      //     ],
      //     stateMutability: "view",
      //     type: "function",
      //   },
      //   {
      //     inputs: [],
      //     name: "owner",
      //     outputs: [
      //       {
      //         internalType: "address",
      //         name: "",
      //         type: "address",
      //       },
      //     ],
      //     stateMutability: "view",
      //     type: "function",
      //   },
      //   {
      //     inputs: [],
      //     name: "renounceOwnership",
      //     outputs: [],
      //     stateMutability: "nonpayable",
      //     type: "function",
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: "uint256",
      //         name: "_id",
      //         type: "uint256",
      //       },
      //     ],
      //     name: "setVote",
      //     outputs: [],
      //     stateMutability: "nonpayable",
      //     type: "function",
      //   },
      //   {
      //     inputs: [],
      //     name: "startProposalsRegistering",
      //     outputs: [],
      //     stateMutability: "nonpayable",
      //     type: "function",
      //   },
      //   {
      //     inputs: [],
      //     name: "startVotingSession",
      //     outputs: [],
      //     stateMutability: "nonpayable",
      //     type: "function",
      //   },
      //   {
      //     inputs: [],
      //     name: "tallyVotes",
      //     outputs: [],
      //     stateMutability: "nonpayable",
      //     type: "function",
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: "address",
      //         name: "newOwner",
      //         type: "address",
      //       },
      //     ],
      //     name: "transferOwnership",
      //     outputs: [],
      //     stateMutability: "nonpayable",
      //     type: "function",
      //   },
      //   {
      //     inputs: [],
      //     name: "winningProposalID",
      //     outputs: [
      //       {
      //         internalType: "uint256",
      //         name: "",
      //         type: "uint256",
      //       },
      //     ],
      //     stateMutability: "view",
      //     type: "function",
      //   },
      //   {
      //     inputs: [],
      //     name: "workflowStatus",
      //     outputs: [
      //       {
      //         internalType: "enum Voting.WorkflowStatus",
      //         name: "",
      //         type: "uint8",
      //       },
      //     ],
      //     stateMutability: "view",
      //     type: "function",
      //   },
      // ];

      // const rpcUrl =
      //   "https://goerli.infura.io/v3/01f74c6334cc4ab0b525a6612a403678";
      // const web3 = new Web3(rpcUrl);
      // ===============================

      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const accounts = await web3.eth.requestAccounts();
      const networkID = await web3.eth.net.getId();
      const { abi } = artifact;
      let address, contract, owner, isOwner;
      try {
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);

        // address = "0x74cd60f2a1f248838222fbfee20b8a6dae5c5800";
        // contract = new web3.eth.Contract(abi, address);
        console.log({
          address,
          contract,
        });
        owner = await contract.methods.owner().call({
          from: accounts[0],
        });

        isOwner = owner === accounts[0];
      } catch (err) {
        console.error(err);
      }
      dispatch({
        type: actions.init,
        data: {
          artifact,
          web3,
          accounts,
          networkID,
          contract,
          owner,
          isOwner,
        },
      });
    }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/Voting.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  // useEffect(() => {
  //   async function checkProvider() {
  //     // You can await here
  //     const provider = await detectEthereumProvider();
  //     console.log({ provider });
  //     setMetamaskProvider(provider);
  //     if (typeof window.ethereum !== "undefined") {
  //       console.log("MetaMask is installed!");
  //       // ethereum.request({ method: "eth_requestAccounts" });
  //     }
  //     // ...
  //   }
  //   checkProvider();
  // }, [init, state.artifact]);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
