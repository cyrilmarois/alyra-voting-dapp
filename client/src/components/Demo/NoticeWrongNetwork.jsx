import "./Index.css";

const NoticeWrongNetwork = () => {
  return (
    <div className="row align-items-center justify-content-center metamask-error">
      <div className="col-auto notice align-items-center">
        ⚠️ MetaMask is not connected to the same network as the one you deployed
        to.
      </div>
    </div>
  );
};

export default NoticeWrongNetwork;
