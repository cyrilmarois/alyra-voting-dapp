import { useState } from "react";
import { useEth } from "../../../contexts/EthContext";
import "./MenuStatus.css";

const MenuStatus = ({ setWorkflowStatus }) => {
  const {
    state: { contract, accounts },
  } = useEth();
  const [currentStatus, setCurrentStatus] = useState(0);

  const startAddVoterHandler = async () => {
    try {
      await contract.methods.addVoter().call({
        from: accounts[0],
      });
      await contract.methods.addVoter().send({
        from: accounts[0],
      });
    } catch (e) {
      alert(e.message);
    }
  };

  const startProposalRegisteringHandler = async () => {
    try {
      await contract.methods.startProposalsRegistering().call({
        from: accounts[0],
      });
      await contract.methods.startProposalsRegistering().send({
        from: accounts[0],
      });
      getCurrentStatus();
    } catch (e) {
      alert(e.message);
    }
  };

  const endProposalRegisteringHandler = async () => {
    try {
      await contract.methods.endProposalsRegistering().call({
        from: accounts[0],
      });
      await contract.methods.endProposalsRegistering().send({
        from: accounts[0],
      });
      getCurrentStatus();
    } catch (e) {
      alert(e.message);
    }
  };

  const startVotingSessionHandler = async () => {
    try {
      await contract.methods.startVotingSession().call({
        from: accounts[0],
      });
      await contract.methods.startVotingSession().send({
        from: accounts[0],
      });
      getCurrentStatus();
    } catch (e) {
      alert(e.message);
    }
  };

  const endVotingSessionHandler = async () => {
    try {
      await contract.methods.endVotingSession().call({
        from: accounts[0],
      });
      await contract.methods.endVotingSession().send({
        from: accounts[0],
      });
      getCurrentStatus();
    } catch (e) {
      alert(e.message);
    }
  };

  const tallyVoteHandler = async () => {
    try {
      await contract.methods.tallyVotes().call({
        from: accounts[0],
      });
      await contract.methods.tallyVotes().send({
        from: accounts[0],
      });
      getCurrentStatus();
    } catch (e) {
      alert(e.message);
    }
  };

  const getCurrentStatus = async () => {
    const tmpCurrentStatus = await contract.methods.workflowStatus().call({
      from: accounts[0],
    });
    setCurrentStatus(parseInt(tmpCurrentStatus));
    setWorkflowStatus(parseInt(tmpCurrentStatus));
  };

  return (
    <div id="MenuStatus">
      <div className="row justify-content-center">
        <div className="col-10">
          <div className="row mb-3">
            <button
              type="button"
              className={`btn btn-primary position-success ${
                currentStatus !== 5 ? "disabled" : ""
              }`}
              onClick={startAddVoterHandler}
            >
              Add voter
            </button>
          </div>
          <div className="row mb-3">
            <button
              type="button"
              className={`btn btn-success position-success ${
                currentStatus !== 0 ? "disabled" : ""
              }`}
              onClick={startProposalRegisteringHandler}
            >
              Start proposals registering
            </button>
          </div>
          <div className="row mb-3">
            <button
              type="button"
              className={`btn btn-info position-success ${
                currentStatus - 1 !== 0 ? "disabled" : ""
              }`}
              onClick={endProposalRegisteringHandler}
            >
              End proposals registering
            </button>
          </div>
          <div className="row mb-3">
            <button
              type="button"
              className={`btn btn-warning position-success ${
                currentStatus - 1 !== 1 ? "disabled" : ""
              }`}
              onClick={startVotingSessionHandler}
            >
              Start voting
            </button>
          </div>
          <div className="row mb-3">
            <button
              type="button"
              className={`btn btn-danger position-success ${
                currentStatus - 1 !== 2 ? "disabled" : ""
              }`}
              onClick={endVotingSessionHandler}
            >
              End voting
            </button>
          </div>
          <div className="row mb-3">
            <button
              type="button"
              className={`btn btn-primary position-success ${
                currentStatus - 1 !== 3 ? "disabled" : ""
              }`}
              onClick={tallyVoteHandler}
            >
              Tally Votes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuStatus;
