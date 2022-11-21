import { EthProvider } from "./contexts/EthContext";
import { WorkflowStatusProvider } from "./contexts/WorkflowStatusContext";
import Header from "./components/Header/Header.jsx";
import Demo from "./components/Demo";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

function App() {
  //   (0) 0xF04Ead0d1F2F40A75F8158068c8ce41F7EB62887 (1000 ETH)
  // (1) 0x338FCd6B54AB4a2832E45d08bB89588B6a28A9a8 (1000 ETH)
  // (2) 0xD4cC9eeE16d6aB5Be0B2E301cBc3493232490036 (1000 ETH)
  // (3) 0x49fdA9aE2D255AeC0Ec42615CFdb9da7FAB741d0 (1000 ETH)
  // (4) 0x863769DF6e2f35c9B92884251fF88214D4357E8C (1000 ETH)
  // (5) 0xB9ed59B061d098a17E5CE54e25f43aaef29DB825 (1000 ETH)
  // (6) 0x7A4CD06E6D77d4fCca7b275AD529e7135f34C79b (1000 ETH)
  // (7) 0xa4696ACf75cB3398C227476947b2Df502cB50b53 (1000 ETH)
  // (8) 0x217E9c4E96A1284073c9B7e0Ccc5430Dcb6011ac (1000 ETH)
  // (9) 0x865ad38D142049f1a3487aF07C0CaeBf43739d06 (1000 ETH)

  // Private Keys
  // ==================
  // (0) 0x7352b821888e8eab5ecb5029170f5b0d809a665316082c786e624ad3a2e39d7e
  // (1) 0xfdc60af2c0894ef5b1b68344a59f375221692e7e209ad3feb89f691b719d4db8
  // (2) 0xaf1e36e44bfffeed0d6f21dd194ee81a2736743fc4e3eb25223316fca7dc9204
  // (3) 0x57bcc43079f645c07fea8a650ae65f45941bd323fe7f0d35bb286b87a93c748d
  // (4) 0x7402de3dfdfe1db3da5e48e66cca5b528cfba5c450af470902dbdbf3bc0a10b6
  // (5) 0x2594fb66777d0d0ede0162e49bfae157f1442f1ea39955034840998b0a510473
  // (6) 0x6fbd39b0cc3e90d5793a11f2f3298e48dc61ccb0a31ab55e4ae9a456c1bfce56
  // (7) 0xece83790c0e351881a37143f4d129152a76f83b3bc08c5bbd0080994da366595
  // (8) 0xbd663a1bb4ed04fc49ba3b8fb17f2d9ad170e9ed05f258b32edfe0701c5a8f03
  // (9) 0x889be32a70192baaa8243e6f0831cfb40655ff54578b31787217a36b1a2b9544

  // HD Wallet
  // ==================
  // Mnemonic:      interest present creek find shuffle december sorry step fame patch fog dry

  return (
    <EthProvider>
      {/* <WorkflowStatusProvider> */}
      <div id="App">
        <div className="container-fluid">
          <Header />
          <Demo />
        </div>
      </div>
      {/* </WorkflowStatusProvider> */}
    </EthProvider>
  );
}

export default App;
