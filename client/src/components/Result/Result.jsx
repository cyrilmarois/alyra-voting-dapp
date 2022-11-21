import { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";
import "./Result.css";

const Result = ({ workflowStatus }) => {
  const {
    state: { contract, accounts },
  } = useEth();

  const [winnerProposal, setWinnerProposal] = useState("");

  useEffect(() => {
    (async function () {
      if (contract) {
        try {
          const tmpWinningProposalId = await contract.methods
            .winningProposalID()
            .call({ from: accounts[0] });

          const winner = await contract.methods
            .getOneProposal(tmpWinningProposalId)
            .call({
              from: accounts[0],
            });

          setWinnerProposal(winner.description);
        } catch (e) {
          alert(e.message);
        }
      }
    })();
  }, [contract]);

  const result = (
    <>
      <div id="Result" className="row g-3 justify-content-center">
        <div className="col-12">
          <h2 className="title">The winner proposal</h2>
          <div className="winning col-12 justify-content-center">
            <span>&#128640;</span>
            <span>&#128640;</span>
            <span>&#128640;</span>
            <p>{winnerProposal}</p>
            <span>&#128640;</span>
            <span>&#128640;</span>
            <span>&#128640;</span>
          </div>
        </div>
      </div>
    </>
  );

  return <>{workflowStatus === 5 ? { result } : null}</>;
};

export default Result;
