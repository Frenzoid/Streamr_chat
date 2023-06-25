import { publicProvider } from 'wagmi/providers/public';
import {
  mainnet,
  polygon,
  polygonMumbai,
} from 'wagmi/chains';
import {
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { PROJECT_ID, APP_NAME } from '../config/constants';

// chains
const { chains, publicClient } = configureChains(
  [mainnet, polygon, polygonMumbai],
  [publicProvider()]
);

// wallets
const { connectors } = getDefaultWallets({
  appName: APP_NAME,
  projectId: PROJECT_ID,
  chains
});

// config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export { chains, wagmiConfig, connectors };