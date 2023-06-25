import { StreamrClient } from 'streamr-client';
import { StreamPermission } from "streamr-client";

// Instantiate StreamrClient with an Ethereum wallet
const client = new StreamrClient({
  auth: {
    ethereum: window.ethereum,
  },
});

// Check if the user has permission to publish to a stream
const checkPubPermissions = async (stream, address) =>
  await stream.hasPermission({
    permission: StreamPermission.PUBLISH,
    user: address,
    allowPublic: true,
  });

// Check if the user has permission to subscribe to a stream
const checkSubPermissions = async (stream, address) =>
  await stream.hasPermission({
    permission: StreamPermission.SUBSCRIBE,
    user: address,
    allowPublic: true,
  });

export { client, checkSubPermissions, checkPubPermissions }