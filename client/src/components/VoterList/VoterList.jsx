import { useEffect } from "react";
import { useState } from "react";
import { useEth } from "../../contexts/EthContext";
import "./VoterList.css";

const VoterList = () => {
  const {
    state: { contract },
  } = useEth();
  const [newVoterAddressEvent, setNewVoterAddressEvent] = useState("");
  const [oldVoterAddressEvent, setOldVoterAddressEvent] = useState("");
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    (async function () {
      if (contract) {
        let oldVoterAddressEvent = await contract.getPastEvents(
          "VoterRegistered",
          {
            fromBlock: 0,
            toBlock: "latest",
          }
        );
        let addresses = [];
        console.log({ oldVoterAddressEvent });
        oldVoterAddressEvent.forEach((event) => {
          addresses.push(event.returnValues.voterAddress);
          console.log({ voterAddress: event.returnValues.voterAddress });
        });

        // setOldVoterAddressEvent(addresses);
        setAddresses(addresses);
        console.log({ addresses, oldVoterAddressEvent });

        await contract.events
          .VoterRegistered({
            fromBlock: "earliest",
          })
          .on("data", (event) => {
            console.log({ event });
            let newEventVoterAddress = event.returnValues.voterAddress;
            console.log({ newEventVoterAddress });
            setNewVoterAddressEvent(newEventVoterAddress);
          })
          .on("changed", (changed) => console.log(changed))
          .on("error", (err) => console.log(err))
          .on("connected", (str) => console.log(str));
      }
    })();
  }, [contract]);
  console.log({ addresses });
  return (
    <div id="voterList" className="row justify-content-center">
      <h2 className="title">Voter list</h2>
      <div className="col-12">
        <ul className="list-address ">
          <li>{newVoterAddressEvent}</li>
          {/* <li>{oldVoterAddressEvent}</li> */}
          {addresses.length > 0
            ? addresses.map((item, i) => <li key="{i}">{item}</li>)
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default VoterList;
