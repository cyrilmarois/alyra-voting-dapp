import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Debug from "../Debug/Debug";
import Voting from "../Voting/Voting";
import VotingTallied from "../VotingTallied/VotingTallied";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Progress from "./Progress/Progress";
import MenuStatus from "../MenuStatus/MenuStatus";
import Result from "../Result/Result";
import AddVoter from "../AddVoter/AddVoter";
import AddProposal from "../AddProposal/AddProposal";

const Demo = () => {
  const { state } = useEth();
  const {
    state: { contract, accounts, isOwner },
  } = useEth();

  const [workflowStatus, setWorkflowStatus] = useState(0);
  console.log({
    "index:init:workflowStatus": workflowStatus,
  });

  useEffect(() => {
    console.log({ "index:init:contract": contract });
    if (contract) {
      const initStatus = async () => {
        console.log("initStatus");
        try {
          // get current status
          const currentStatus = await contract.methods.workflowStatus().call({
            from: accounts[0],
          });
          console.log({ "index:init:currentStatus": parseInt(currentStatus) });
          setWorkflowStatus(parseInt(currentStatus));
        } catch (e) {
          alert(e.message);
        }
      };
      initStatus().catch(console.error);
    }
  }, [accounts, contract]);

  useEffect(() => {
    if (contract) {
      const fetchEventStatus = async () => {
        // fetch new status
        const eventNewStatus = await contract.events
          .WorkflowStatusChange({ fromBlock: "earliest" })
          .on("data", (event) => {
            console.debug({ event });
            // let newStatusEvent = event.returnValues.newStatus;
            console.log({
              "index:newStatusEvent": event.returnValues.newStatus,
              "index:newStatusEvent:parseInt": parseInt(
                event.returnValues.newStatus
              ),
            });
            // setWorkflowStatus(parseInt(newStatusEvent));
            return parseInt(event.returnValues.newStatus);
          });

        console.log({
          "index:newStatusEvent": eventNewStatus,
          conditionNan: isNaN(eventNewStatus),
        });
        if (!isNaN(eventNewStatus)) {
          setWorkflowStatus(parseInt(eventNewStatus));
        }
      };
      fetchEventStatus().catch(console.error);
    }
  }, [accounts, contract]);

  const demo = (
    <>
      <div className="container">
        <div className="row">
          <Progress workflowStatus={workflowStatus} />
          <div className="row">
            <div className="col-md-2">
              {isOwner ? <MenuStatus workflowStatus={workflowStatus} /> : null}
            </div>
            <div className="col-md-10">
              {isOwner && workflowStatus === 0 ? <AddVoter /> : null}
              {!isOwner ? (
                <AddProposal workflowStatus={workflowStatus} />
              ) : null}
              {!isOwner ? <Voting workflowStatus={workflowStatus} /> : null}
              {isOwner ? <VotingTallied /> : null}
              {!isOwner ? <Result workflowStatus={workflowStatus} /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {!state.artifact ? (
        <div className="col-md-12">
          <NoticeNoArtifact />
        </div>
      ) : !state.contract ? (
        <div className="col-md-12">
          <NoticeWrongNetwork />
        </div>
      ) : (
        demo
      )}
    </>
  );
};

export default Demo;
