import { createThirdwebClient, defineChain } from "thirdweb";

// Create the client
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
    throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

// Define the chain: Base Sepolia Testnet
export const chain = defineChain({
  id: 84532,
  rpc: "https://sepolia.base.org", // Public RPC to bypass Thirdweb Gateway auth for read-only
});
