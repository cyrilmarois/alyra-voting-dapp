import { useState } from "react";
import { useEth } from "../../../contexts/EthContext";
import NoticeSessionComplete from "./NoticeSessionComplete";
import "./TallyVotes.css";

const TallyVotes = ({ workflowStatus }) => {
  console.log({ "VotingTallied:init:workflowStatus": workflowStatus });

  return (
    <>
      {workflowStatus === 5 ? (
        <div className="col-md-12">
          <NoticeSessionComplete />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default TallyVotes;
