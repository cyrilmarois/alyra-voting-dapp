import { useEffect, useState } from "react";
import { useEth } from "../../../contexts/EthContext";
import NoticeResultNotAvailable from "./NoticeResultNotAvailable";
import "./Result.css";

const Result = ({ workflowStatus }) => {
  console.log({ "result:workflowStatus": workflowStatus });
  const {
    state: { contract, accounts },
  } = useEth();

  const [winnerProposal, setWinnerProposal] = useState("");
  const [oldProposalEvent, setOldProposalEvent] = useState([]);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    if (contract && workflowStatus === 5) {
      const fetchProposalEvents = async () => {
        const oldProposalEvent = await contract.getPastEvents(
          "ProposalRegistered",
          {
            fromBlock: 0,
            toBlock: "latest",
          }
        );

        setOldProposalEvent(oldProposalEvent);
      };
      fetchProposalEvents().catch(console.error);
    }
  }, [workflowStatus]);

  // get all proposals with voteCount
  useEffect(() => {
    if (contract && workflowStatus === 5) {
      const fetchProposals = async () => {
        const tmpProposals = await Promise.all(
          oldProposalEvent.map(async (event) => {
            const proposalId = parseInt(event.returnValues.proposalId);

            try {
              const tmpProposal = await contract.methods
                .getOneProposal(proposalId)
                .call({ from: accounts[0] });

              return tmpProposal;
            } catch (e) {
              console.error();
            }
          })
        );
        console.error({ tmpProposals: tmpProposals });
        setProposals(tmpProposals);
      };
      fetchProposals().catch(console.error);
    }
  }, [workflowStatus, oldProposalEvent]);

  useEffect(() => {
    (async function () {
      if (contract && workflowStatus === 5) {
        try {
          const tmpWinningProposalId = await contract.methods
            .winningProposalID()
            .call({ from: accounts[0] });

          const winner = await contract.methods
            .getOneProposal(tmpWinningProposalId)
            .call({
              from: accounts[0],
            });
          console.error({ winner: winner });
          setWinnerProposal(winner);
        } catch (e) {
          alert(e.message);
        }
      }
    })();
  }, [workflowStatus, contract]);

  const result = (
    <>
      <div id="Result" className="row g-3 justify-content-center">
        <div className="col-12">
          <h1 className="title">We have a winner</h1>
          <div className="row winner justify-content-center">
            <div className="winning col-12 justify-content-center">
              <div className="notice col-12 justify-content-center">
                We thank you for your participation
              </div>
              <span>&#128640;</span>
              <span>&#128640;</span>
              <span>&#128640;</span>
              <p>
                {winnerProposal.description} : {winnerProposal.voteCount}
              </p>
              <span>&#128640;</span>
              <span>&#128640;</span>
              <span>&#128640;</span>
            </div>
          </div>
          <div className="row g-3 justify-content-center">
            <div className="col-12">
              <h2 className="title">Result list</h2>
              <ul className="list-proposals">
                {proposals.length > 0
                  ? proposals.map((item, i) => (
                      <li key={i}>
                        {item.description}:{item.voteCount}
                      </li>
                    ))
                  : ""}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {workflowStatus === 4 ? (
        <div className="col-md-12">
          <NoticeResultNotAvailable />
        </div>
      ) : workflowStatus === 5 ? (
        result
      ) : null}
    </>
  );
};

export default Result;
