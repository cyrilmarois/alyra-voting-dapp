import { EthProvider } from "./contexts/EthContext";
import Header from "./components/UI/Header/Header.jsx";
import Demo from "./components/Pages/Demo";
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
