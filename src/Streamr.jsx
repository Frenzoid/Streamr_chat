
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import Chat from "./components/Chat";
import Alert from "./components/Alert";

function Streamr() {

  const { isConnected, address } = useAccount();

  return (
    <div className={"container"}>
      <div className={"d-flex flex-row mt-4 text-center justify-content-between"}>
        <div className={"d-flex flex-row"}>
          <img src={"https://docs.streamr.network/img/streamr-logo.svg"} alt={"Streamr logo"} width={"40px"} />
          <h1 className={"ms-3"}>Simple Streamr Chat</h1>
        </div>
        <div>
          <ConnectButton label="Connect Wallet" accountStatus="avatar" chainStatus="icon" />
        </div>
      </div>
      <hr />
      {isConnected ? <Chat address={address} /> : <Alert message={"Please, connect your wallet :)"} color={"warning"} />}
      <footer className={"fixed-bottom text-center"}>
        Made by <a href="https://www.github.com/Frenzoid">@Frenzoid</a> with <span className={"text-danger"}>❤.</span>
        <pre>Any DATA will be helpful :) → <span className={"text-primary"}>0x7030f4D0dC092449E4868c8DDc9bc00a14C9f561</span></pre>
      </footer>
    </div >
  )
}

export default Streamr;