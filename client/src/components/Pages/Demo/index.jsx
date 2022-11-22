import { useEffect, useState } from "react";
import { useEth } from "../../../contexts/EthContext";
import Voting from "../Voting/Voting";
import TallyVotes from "../TallyVotes/TallyVotes";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Progress from "./Progress/Progress";
import MenuStatus from "../../UI/MenuStatus/MenuStatus";
import Result from "../Result/Result";
import AddVoter from "../AddVoter/AddVoter";
import AddProposal from "../AddProposal/AddProposal";

const Demo = () => {
  const { state } = useEth();
  const {
    state: { contract, accounts, isOwner },
  } = useEth();

  const [workflowStatus, setWorkflowStatus] = useState(0);
  // console.log({
  //   "index:init:workflowStatus": workflowStatus,
  // });

  useEffect(() => {
    // console.log({ "index:init:contract": contract });
    if (contract) {
      const initStatus = async () => {
        try {
          // get current status
          const currentStatus = await contract.methods.workflowStatus().call({
            from: accounts[0],
          });
          console.log({
            "index:currentStatus": parseInt(currentStatus),
          });
          setWorkflowStatus(parseInt(currentStatus));
        } catch (e) {
          alert(e.message);
        }
      };
      initStatus().catch(console.error);
    }
  }, [accounts, contract]);

  const demo = (
    <>
      <div className="container">
        <div className="row">
          <Progress workflowStatus={workflowStatus} />
          <div className="row">
            <div className="col-md-2">
              {isOwner ? (
                <MenuStatus setWorkflowStatus={setWorkflowStatus} />
              ) : null}
            </div>
            <div className="col-md-10">
              {isOwner ? <AddVoter workflowStatus={workflowStatus} /> : null}
              {!isOwner ? (
                <AddProposal workflowStatus={workflowStatus} />
              ) : null}
              {!isOwner ? <Voting workflowStatus={workflowStatus} /> : null}
              {isOwner ? <TallyVotes workflowStatus={workflowStatus} /> : null}
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
