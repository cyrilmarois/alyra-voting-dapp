import { useEffect } from "react";
import { useState } from "react";
import { useEth } from "../../contexts/EthContext";
import "./MenuStatus.css";

const MenuStatus = ({ workflowStatus }) => {
  console.log({ "menuStatus:init": workflowStatus });
  const {
    state: { contract, accounts },
  } = useEth();
  const [newEventStatus, setNewEventStatus] = useState(workflowStatus);

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
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    (async function () {
      if (contract) {
        setNewEventStatus(workflowStatus);
        // fetch new status
        await contract.events
          .WorkflowStatusChange({ fromBlock: "earliest" })
          .on("data", (event) => {
            let newStatusEvent = event.returnValues.newStatus;
            console.log({ newStatusEvent: parseInt(newStatusEvent) });
            setNewEventStatus(parseInt(newStatusEvent));
          });
      }
    })();
  }, [contract, accounts, newEventStatus]);
  console.log({ "MenuStatus:newEventStatus": newEventStatus });

  return (
    <div id="MenuStatus">
      <div className="row justify-content-center">
        <div className="col-10">
          <div className="row mb-3">
            <button
              type="button"
              // className={`btn btn-primary position-relative ${
              //   newEventStatus !== 0 ? "" : "disabled"
              // }`}
              className="btn btn-primary position-relative"
              onClick={startAddVoter}
            >
              Add voter
            </button>
          </div>
          <div className="row mb-3">
            <button
              type="button"
              // className={`btn btn-success position-relative ${
              //   newEventStatus === 0 ? "" : "disabled"
              // }`}
              className="btn btn-success position-relative"
              onClick={startProposalRegistering}
            >
              Start proposals registering
            </button>
          </div>
          <div className="row mb-3">
            <button
              type="button"
              // className={`btn btn-info position-relative ${
              //   newEventStatus === 1 ? "" : "disabled"
              // }`}
              className="btn btn-info position-relative"
              onClick={endProposalRegistering}
            >
              End proposals registering
            </button>
          </div>
          <div className="row mb-3">
            <button
              type="button"
              // className={`btn btn-warning position-relative ${
              //   newEventStatus === 2 ? "" : "disabled"
              // }`}
              className="btn btn-warning position-relative"
              onClick={startVotingSession}
            >
              Start voting
            </button>
          </div>
          <div className="row mb-3">
            <button
              type="button"
              // className={`btn btn-danger position-relative ${
              //   newEventStatus < 4 ? "" : "disabled"
              // }`}
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
