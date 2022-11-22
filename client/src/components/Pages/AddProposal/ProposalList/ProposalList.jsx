import { useEffect } from "react";
import { useState } from "react";
import { useEth } from "../../../../contexts/EthContext";
import "./ProposalList.css";

const ProposalList = () => {
  const {
    state: { contract, accounts },
  } = useEth();

  const [newProposalEvent, setNewProposalEvent] = useState("");
  const [oldProposalEvent, setOldProposalEvent] = useState([]);
  const [proposals, setProposals] = useState([]);
  console.debug({ "pplist:newProposalEvent": newProposalEvent });

  // get new proposal

  // useEffect(async () => {
  //   if (contract) {
  //     const getProposalId = async () => {
  //       const proposalId = await contract.events
  //         .ProposalRegistered({
  //           fromBlock: "earliest",
  //         })
  //         .on("data", (event) => {
  //           console.log({ "pplist:event": event.returnValues.proposalId });
  //           // return parseInt(event.returnValues.proposalId);
  //           return parseInt(event.returnValues.proposalId);
  //         })
  //         .on("changed", (changed) => console.log({ changed }))
  //         .on("error", (err) => console.log({ err }))
  //         .on("connected", (str) => console.log({ str }));

  //       console.log({ "pplist:1:proposalId": proposalId });
  //     };
  //     getProposalId().catch(console.error);
  //     // console.log({ "pplist:2:proposalId": proposalId });
  //     // setNewProposalEvent(proposalId);
  //     try {
  //       console.error("HODOR");
  //       // const tmpProposal = await contract.methods
  //       //   .getOneProposal(proposalId)
  //       //   .call({ from: accounts[0] });
  //       // console.log({
  //       //   "pplist:tmpProposal:description": tmpProposal?.description,
  //       // });
  //       // setNewProposalEvent(tmpProposal?.description);
  //     } catch (e) {
  //       console.error();
  //     }
  //   }
  // }, [contract, newProposalEvent]);

  // get old proposals
  useEffect(() => {
    if (contract) {
      const fetchProposalOldEvents = async () => {
        const oldProposalEvent = await contract.getPastEvents(
          "ProposalRegistered",
          {
            fromBlock: 0,
            toBlock: "latest",
          }
        );
        console.log({ "pplist:oldProposalEvent": oldProposalEvent });
        setOldProposalEvent(oldProposalEvent);
      };
      fetchProposalOldEvents().catch(console.error);
    }
  }, []);

  // get proposals listing
  useEffect(() => {
    if (contract) {
      const fetchProposals = async () => {
        const tmpProposals = await Promise.all(
          oldProposalEvent.map(async (event) => {
            const proposalId = parseInt(event.returnValues.proposalId);

            try {
              const tmpProposal = await contract.methods
                .getOneProposal(proposalId)
                .call({ from: accounts[0] });

              return tmpProposal?.description;
            } catch (e) {
              console.error();
            }
          })
        );
        setProposals(tmpProposals);
      };
      fetchProposals().catch(console.error);
    }
  }, [oldProposalEvent]);

  return (
    <div id="proposalList" className="row justify-content-center">
      <h1 className="title">Proposals listing</h1>
      <div className="col-12">
        <ul className="list-proposals">
          {/* <li>{newProposalEvent}</li> */}
          {proposals.length > 0
            ? proposals.map((item, i) => <li key={i}>{item}</li>)
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default ProposalList;
