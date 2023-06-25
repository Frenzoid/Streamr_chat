
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
    </div >
  )
}

export default Streamr;