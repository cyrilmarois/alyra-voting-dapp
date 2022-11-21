function NoticeNoArtifact() {
  return (
    <div className="row align-items-center justify-content-center metamask-error">
      ⚠️ Cannot find <span className="code">Voting</span> contract artifact.
      Please complete the above preparation first, then restart the react dev
      server.
    </div>
  );
}

export default NoticeNoArtifact;
