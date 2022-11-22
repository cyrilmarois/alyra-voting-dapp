import { useState } from "react";
import { useEth } from "../../../contexts/EthContext";
import VoterList from "./VoterList/VoterList";
import "./AddVoter.css";

const AddVoter = ({ workflowStatus }) => {
  const {
    state: { contract, accounts },
  } = useEth();
  const [voterAddressInput, setVoterAddressInput] = useState("");
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleInputAddressChange = (e) => {
    setVoterAddressInput(e.target.value);
    setHasError(false);
    setError("");
  };

  const addVoterHandler = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (
      voterAddressInput === "" ||
      !/0x[a-fA-F0-9]{40}/.test(voterAddressInput)
    ) {
      setHasError(true);
      setError("Please provide a valid ethereum address.");
      return;
    }
    try {
      await contract.methods
        .addVoter(voterAddressInput)
        .call({ from: accounts[0] });
      await contract.methods
        .addVoter(voterAddressInput)
        .send({ from: accounts[0] });
    } catch (e) {
      setHasError(true);
      setError(e.message);
    }
  };

  const addVoter = (
    <>
      <div id="voter" className="row g-3 justify-content-center">
        <h1 className="title">Add a voter</h1>
        <div className="col-5">
          <form
            className="row justify-content-center g-3 needs-validation"
            noValidate
          >
            <input
              type="text"
              className={`form-control ${hasError ? "error" : ""}`}
              id="voterAddressInput"
              value={voterAddressInput}
              placeholder="0x..."
              onChange={handleInputAddressChange}
              required
            />
            <div className="error">{error}</div>
            <button
              type="button"
              onClick={addVoterHandler}
              className="btn btn-primary btn-lg"
            >
              Add
            </button>
          </form>
        </div>
        <div className="col-12">
          <VoterList />
        </div>
      </div>
    </>
  );

  return <>{workflowStatus === 0 ? addVoter : null}</>;
};

export default AddVoter;
