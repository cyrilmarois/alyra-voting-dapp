import { useState } from "react";
import { useEth } from "../../contexts/EthContext";
import "./Debug.css";

function Debug() {
  const {
    state: { contract, accounts },
  } = useEth();
  const [maker, setMaker] = useState("Jesus");
  const [voter, setVoter] = useState("");
  const [inputAddress, setInputAddress] = useState("");

  const handleInputVoterAddressChange = (e) => {
    setInputAddress(e.target.value);
  };

  const getOwner = async () => {
    const tmpMaker = await contract.methods.owner().call({ from: accounts[0] });
    setMaker(tmpMaker);
  };

  const getVoter = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }

    if (inputAddress === "") {
      alert("Please enter a valid ethereum address");
    }
    try {
      console.log({ inputAddress });
      const tmpVoter = await contract.methods
        .getVoter(inputAddress)
        .call({ from: accounts[0] });
      console.log({
        isRegistered: tmpVoter.isRegistered,
        hasVoted: tmpVoter.hasVoted,
        votedProposalId: tmpVoter.votedProposalId,
      });
      setVoter(tmpVoter);
      console.log({
        voter,
      });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div id="debug" className="row">
      <div className="col">
        <h2 className="title">Debug Component</h2>
        <div className="row">
          <div className="col-6">
            <button onClick={getOwner} type="button">
              Get owner
            </button>
            {maker}
          </div>
          <div className="col-6">
            <form className="row g-3">
              <label htmlFor="addressVoterInput" className="form-label">
                Ethereum address
              </label>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  id="addressVoterInput"
                  value={inputAddress}
                  placeholder="0x..."
                  onChange={handleInputVoterAddressChange}
                />
              </div>
              <div className="col-auto">
                <button
                  onClick={getVoter}
                  type="button"
                  className="btn btn-primary mb-3"
                >
                  Get voter
                </button>
              </div>
              <div className="row">
                <div className="col-auto">
                  {/* {voter.hasVoted}
                {voter.isRegistered}
                {voter.votedProposalId} */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Debug;
