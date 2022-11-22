import { useState } from "react";
import { useEth } from "../../contexts/EthContext";
import "./VotingTallied.css";

const VotingTallied = ({ workflowStatus }) => {
  // console.log({ "VotingTallied:init:workflowStatus": workflowStatus });
  const {
    state: { contract, accounts },
  } = useEth();
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);

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
      <div
        id="votingTallied"
        className="row align-items-center justify-content-center"
      >
        <div className="col-5">
          <div className="row justify-content-center">
            <button type="btn btn-primary" onClick={startTalliedHandler}>
              Pick the winner <span>&#128373;</span>
            </button>
            <div className="error">{error}</div>
          </div>
        </div>
      </div>
    </>
  );

  return <>{workflowStatus === 4 ? tallyVotes : null}</>;
};

export default VotingTallied;
