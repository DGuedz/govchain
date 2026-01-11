export const EAS_CONFIG = {
  // Base Sepolia Addresses
  EAS_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_EAS_CONTRACT_ADDRESS || "0x4200000000000000000000000000000000000021", 
  
  // Schema for General Documents
  // Schema: bytes32 contentHash, string docType, uint256 timestamp
  SCHEMA_UID_DOCS: process.env.NEXT_PUBLIC_SCHEMA_UID_DOCS || "0x0000000000000000000000000000000000000000000000000000000000000001",

  // Schema for Voting (New)
  // Schema: bytes32 proposalId, uint8 choice, bytes32 cpfHash, string userTier
  SCHEMA_UID_VOTE: process.env.NEXT_PUBLIC_SCHEMA_UID_VOTE || "0x0000000000000000000000000000000000000000000000000000000000000002",
};
