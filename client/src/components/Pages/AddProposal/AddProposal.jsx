import { useState } from "react";
import { useEth } from "../../../contexts/EthContext";
import ProposalList from "./ProposalList/ProposalList";
import NoticeProposalNotStarted from "./NoticeProposalNotStarted";
import "./AddProposal.css";

const AddProposal = ({ workflowStatus }) => {
  // console.log({ addProposal: workflowStatus });
  const {
    state: { contract, accounts },
  } = useEth();
  const [inputProposal, setInputProposal] = useState("");
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const handleInputProposalChange = (e) => {
    setInputProposal(e.target.value);
    setHasError(false);
    setError("");
  };

  const addProposalHandler = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }

    if (inputProposal === "") {
      setHasError(true);
      setError("Please enter a valid proposal");
      return;
    }
    try {
      await contract.methods
        .addProposal(inputProposal)
        .call({ from: accounts[0] });
      await contract.methods
        .addProposal(inputProposal)
        .send({ from: accounts[0] });
    } catch (e) {
      setHasError(true);
      setError(e.message);
    }
  };
  const addProposal = (
    <>
      <div id="proposal" className="row g-3 justify-content-center">
        <h1 className="title">Submit a proposal</h1>
        <div className="col-5 form">
          <form
            className="row justify-content-center g-3 needs-validation"
            noValidate
          >
            <input
              type="text"
              className={`form-control ${hasError ? "error" : ""}`}
              id="proposalInput"
              defaultValue={inputProposal}
              placeholder="What do you want.. ?"
              onChange={handleInputProposalChange}
              required
            />
            <div className="error">{error}</div>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={addProposalHandler}
            >
              Add
            </button>
          </form>
        </div>
        <div className="col-md-12">
          <ProposalList />
        </div>
      </div>
    </>
  );

  return (
    <>
      {workflowStatus === 0 ? (
        <div className="col-md-12">
          <NoticeProposalNotStarted />
        </div>
      ) : workflowStatus === 1 ? (
        addProposal
      ) : null}
    </>
  );
};

export default AddProposal;
