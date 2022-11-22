import "./Index.css";

function NoticeNoArtifact() {
  return (
    <div className="row align-items-center justify-content-center metamask-error">
      <div className="col-auto notice align-items-center">
        ⚠️ Cannot find <span className="code">Voting</span> contract artifact.
        Please complete the above preparation first, then restart the react dev
        server.
      </div>
    </div>
  );
}

export default NoticeNoArtifact;
