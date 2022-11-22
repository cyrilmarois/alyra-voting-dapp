import "./TallyVotes.css";

const NoticeSessionComplete = () => {
  return (
    <div className="row align-items-center justify-content-center metamask-error">
      <div className="col-auto notice align-items-center">
        Good job ! Session is complete, enjoy a <span>&#9749;</span>
      </div>
    </div>
  );
};

export default NoticeSessionComplete;
