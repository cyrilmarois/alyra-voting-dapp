import { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";
import "./VotingTallied.css";

const VotingTallied = ({ workflowStatus }) => {
  console.log({ "VotingTallied:init:workflowStatus": workflowStatus });
  const {
    state: { contract, accounts },
  } = useEth();
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [winnerProposal, setWinnerProposal] = useState("TADAMMM !!!");
  console.log({ "VotingTallied:init:winnerProposal": winnerProposal });

  const startTalliedHandler = async () => {
    try {
      await contract.methods.tallyVotes().call({
        from: accounts[0],
      });
      await contract.methods.tallyVotes().send({
        from: accounts[0],
      });
    } catch (e) {
      setHasError(true);
      setError(e.message);
    }
  };

  const tallyVotes = (
    <>
      <div id="votingTallied" className="row justify-content-center">
        <h2 className="title">Pick the winner</h2>

        <div className="col-5">
          <div className="row  justify-content-center">
            <button type="btn btn-primary" onClick={startTalliedHandler}>
              Let's go <span>&#128373;</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return <>{workflowStatus === 4 ? tallyVotes : null}</>;
};

export default VotingTallied;
