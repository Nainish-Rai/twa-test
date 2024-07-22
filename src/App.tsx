import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import { useSDK } from "@metamask/sdk-react";
import "@twa-dev/sdk";
import { useState } from "react";
import { disconnect } from "process";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function App() {
  const { network } = useTonConnect();
  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const [account, setAccount] = useState<string>();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      console.log(accounts);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  const disconnect = async () => {
    try {
      await sdk?.disconnect();
    } catch (err) {
      console.warn("failed to disconnect..", err);
    }
  };

  return (
    <div
      className="  App"
      style={{
        backgroundColor: "black",
        width: "100%",
        height: "100vh",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ color: "white" }}>Nainish MiniApp</div>
      <button
        style={{ padding: 10, margin: 10, borderRadius: 10 }}
        onClick={connect}
      >
        Connect
      </button>
      <button
        style={{ padding: 10, margin: 10, borderRadius: 10 }}
        onClick={disconnect}
      >
        Disconnet
      </button>
      {connected && (
        <div style={{ color: "white" }}>
          <>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {account && `Connected account: ${account}`}
          </>
        </div>
      )}
    </div>
  );
}

export default App;
