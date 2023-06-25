import '@rainbow-me/rainbowkit/styles.css';
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { wagmiConfig, chains } from './utils/rainbowkit';

import Streamr from './Streamr.jsx';

function App() {

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider coolMode chains={chains}>
        <Streamr />
      </RainbowKitProvider>
    </WagmiConfig>
  )

}

export default App
