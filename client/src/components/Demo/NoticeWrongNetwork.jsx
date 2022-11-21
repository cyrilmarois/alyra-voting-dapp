import "./Index.css";

const NoticeWrongNetwork = () => {
  return (
    <div className="row align-items-center justify-content-center metamask-error">
      ⚠️ MetaMask is not connected to the same network as the one you deployed
      to.
    </div>
  );
};

export default NoticeWrongNetwork;
