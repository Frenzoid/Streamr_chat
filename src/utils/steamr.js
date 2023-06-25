import { StreamrClient } from 'streamr-client';

const client = new StreamrClient({
  auth: {
    ethereum: window.ethereum,
  },
});

export { client }