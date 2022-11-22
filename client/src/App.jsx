import { EthProvider } from "./contexts/EthContext";
import Header from "./components/Header/Header.jsx";
import Demo from "./components/Demo";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container-fluid">
          <Header />
          <Demo />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
