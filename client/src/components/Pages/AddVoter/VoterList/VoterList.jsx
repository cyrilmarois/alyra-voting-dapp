import { useEffect } from "react";
import { useState } from "react";
import { useEth } from "../../../../contexts/EthContext";
import "./VoterList.css";

const VoterList = () => {
  const {
    state: { contract },
  } = useEth();
  const [newVoterAddressEvent, setNewVoterAddressEvent] = useState("");
  const [oldVoterAddressEvent, setOldVoterAddressEvent] = useState([]);

  // get old voter
  useEffect(() => {
    if (contract) {
      const fetchPreviousVoters = async () => {
        let oldVoterAddressEvent = await contract.getPastEvents(
          "VoterRegistered",
          {
            fromBlock: 0,
            toBlock: "latest",
          }
        );
        let addresses = [];
        oldVoterAddressEvent.forEach((event) => {
          console.log({
            "voterlist:oldVoterAddress": event.returnValues.voterAddress,
          });
          addresses.push(event.returnValues.voterAddress);
        });
        setOldVoterAddressEvent(addresses);
      };
      fetchPreviousVoters().catch(console.error);
    }
  }, []);

  // get new voter
  useEffect(() => {
    if (contract) {
      (async function () {
        await contract.events
          .VoterRegistered({
            fromBlock: "earliest",
          })
          .on("data", (event) => {
            setNewVoterAddressEvent(event.returnValues.voterAddress);
          })
          .on("changed", (changed) => console.log({ changed }))
          .on("error", (err) => console.log({ err }))
          .on("connected", (str) => console.log({ str }));
      })();
    }
  }, [contract]);

  return (
    <div id="voterList" className="row justify-content-center">
      <h1 className="title">Voters listing</h1>
      <div className="col-12">
        <ul className="list-address ">
          <li>{newVoterAddressEvent}</li>
          {oldVoterAddressEvent.length > 0
            ? oldVoterAddressEvent.map((item, key) => <li key={key}>{item}</li>)
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default VoterList;
