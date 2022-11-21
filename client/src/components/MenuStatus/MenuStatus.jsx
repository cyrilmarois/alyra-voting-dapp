import { useEffect } from "react";
import { useState } from "react";
import { useEth } from "../../contexts/EthContext";
import "./MenuStatus.css";

const MenuStatus = ({ setWorkflowStatus }) => {
  const {
    state: { contract, accounts },
  } = useEth();

  const startAddVoter = async () => {
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

  const startProposalRegistering = async () => {
    try {
      await contract.methods.startProposalsRegistering().call({
        from: accounts[0],
      });
      await contract.methods.startProposalsRegistering().send({
        from: accounts[0],
      });
      currentStatus();
    } catch (e) {
      alert(e.message);
    }
  };

  const endProposalRegistering = async () => {
    try {
      await contract.methods.endProposalsRegistering().call({
        from: accounts[0],
      });
      await contract.methods.endProposalsRegistering().send({
        from: accounts[0],
      });
      currentStatus();
    } catch (e) {
      alert(e.message);
    }
  };

  const startVotingSession = async () => {
    try {
      await contract.methods.startVotingSession().call({
        from: accounts[0],
      });
      await contract.methods.startVotingSession().send({
        from: accounts[0],
      });
      currentStatus();
    } catch (e) {
      alert(e.message);
    }
  };

  const endVotingSession = async () => {
    try {
      await contract.methods.endVotingSession().call({
        from: accounts[0],
      });
      await contract.methods.endVotingSession().send({
        from: accounts[0],
      });
      currentStatus();
    } catch (e) {
      alert(e.message);
    }
  };

  const currentStatus = async () => {
    const currentStatus = await contract.methods.workflowStatus().call({
      from: accounts[0],
    });
    setWorkflowStatus(parseInt(currentStatus));
  };

  return (
    <div id="MenuStatus">
      <div className="row justify-content-center">
        <div className="col-10">
          <div className="row mb-3">
            <button
              type="button"
              className="btn btn-primary position-relative"
              onClick={startAddVoter}
            >
              Add voter
            </button>
          </div>
          <div className="row mb-3">
            <button
              type="button"
              className="btn btn-success position-relative"
              onClick={startProposalRegistering}
            >
              Start proposals registering
            </button>
          </div>
          <div className="row mb-3">
            <button
              type="button"
              className="btn btn-info position-relative"
              onClick={endProposalRegistering}
            >
              End proposals registering
            </button>
          </div>
          <div className="row mb-3">
            <button
              type="button"
              className="btn btn-warning position-relative"
              onClick={startVotingSession}
            >
              Start voting
            </button>
          </div>
          <div className="row mb-3">
            <button
              type="button"
              className="btn btn-danger position-relative"
              onClick={endVotingSession}
            >
              End voting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuStatus;
