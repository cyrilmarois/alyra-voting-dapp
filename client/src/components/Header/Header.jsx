import { useEth } from "../../contexts/EthContext";
import "./Header.css";

const Header = () => {
  const {
    state: { accounts, contract },
  } = useEth();
  const { state } = useEth();
  let loggedAccount = "CONNECT";
  let fullAddress = "CONNECT";
  if (accounts && accounts[0]) {
    fullAddress = accounts[0];
    loggedAccount = accounts[0].slice(0, 5) + "..." + accounts[0].slice(-4);
  }

  const connectMetamaskHandler = () => {
    //Will Start the metamask extension
    console.log({ ethereum: window.ethereum });
    window.ethereum.request({ method: "eth_requestAccounts" });
  };

  return (
    <div id="Header" className="row align-items-start">
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="https://alyra.fr/wp-content/uploads/2019/06/logo-titre-alyra-bleu-transparent-64px_v3.png"
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
          </a>
          <div className="d-flex flex-row-reverse">
            <button
              className="block"
              id="output"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              onClick={connectMetamaskHandler}
              title={fullAddress}
            >
              {loggedAccount}
            </button>
            {!state.contract ? (
              <span id="monkey-network">&#128584;</span>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
