import { useEffect } from "react";
import { useState } from "react";
import { useEth } from "../../contexts/EthContext";
import "./ProposalList.css";

const ProposalList = () => {
  const {
    state: { contract, accounts },
  } = useEth();
  const [newProposalEvent, setNewProposalEvent] = useState("");
  const [oldProposalEvent, setOldProposalEvent] = useState("");
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    (async function () {
      if (contract) {
        let oldProposalEvent = await contract.getPastEvents(
          "ProposalRegistered",
          {
            fromBlock: 0,
            toBlock: "latest",
          }
        );

        let proposals = [];
        console.log({ oldProposalEvent });
        oldProposalEvent.forEach(async (event) => {
          const proposalId = parseInt(event.returnValues.proposalId);
          console.log({ proposalId });
          try {
            const oldTmpProposal = await contract.methods
              .getOneProposal(proposalId)
              .call({ from: accounts[0] });
            if (oldTmpProposal) {
              console.log({ description: oldTmpProposal.description });
              proposals.push(oldTmpProposal.description);
            }
          } catch (e) {
            alert(e);
          }
        });

        // setOldProposalEvent(proposals);
        setProposals(proposals);
        console.log({ proposals, oldProposalEvent });

        await contract.events
          .ProposalRegistered({
            fromBlock: "earliest",
          })
          .on("data", async (event) => {
            // console.log({ event });
            let newEventProposalId = parseInt(event.returnValues.proposalId);
            console.log({ newEventProposalId });
            const newTmpProposal = await contract.methods
              .getOneProposal(newEventProposalId)
              .call({ from: accounts[0] });
            console.log({ description: newTmpProposal.description });
            setNewProposalEvent(newTmpProposal.description);
          })
          .on("changed", (changed) => console.log(changed))
          .on("error", (err) => console.log(err))
          .on("connected", (str) => console.log(str));
      }
    })();
  }, [contract, accounts]);
  console.log({ proposals });
  return (
    <div id="proposalList" className="row justify-content-center">
      <h2 className="title">Existing proposals</h2>
      <div className="col-12">
        <ul className="list-proposals">
          <li>{newProposalEvent}</li>
          {/* <li>{oldVoterAddressEvent}</li> */}
          {proposals.length > 0
            ? proposals.map((item, i) => <li key="{i}">{item}</li>)
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default ProposalList;
