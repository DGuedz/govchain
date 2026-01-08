import { useState } from "react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { BrowserProvider, JsonRpcSigner } from "ethers";

// Base Sepolia EAS Contract Address (Official)
const EAS_CONTRACT_ADDRESS = "0x4200000000000000000000000000000000000021";

// Generic Schema UID for testing (bytes32 contentHash)
// Schema: bytes32 eventHash
const SCHEMA_UID = "0xc59265615401143689cbfe73046a922c97562253a48ffa26f933d47b458739d6";

export function useAttest() {
  const [status, setStatus] = useState<"idle" | "signing" | "attesting" | "success" | "error">("idle");
  const [attestationUID, setAttestationUID] = useState<string | null>(null);

  const attestDocument = async (signer: JsonRpcSigner, hash: string, docType: string) => {
    try {
      setStatus("signing");
      
      const eas = new EAS(EAS_CONTRACT_ADDRESS);
      eas.connect(signer);

      // Initialize SchemaEncoder with the schema string
      // Note: The schema UID provided corresponds to "bytes32 eventHash".
      // We are mapping our document hash to this field.
      const schemaEncoder = new SchemaEncoder("bytes32 eventHash");
      const encodedData = schemaEncoder.encodeData([
        { name: "eventHash", value: hash, type: "bytes32" },
      ]);

      setStatus("attesting");

      const tx = await eas.attest({
        schema: SCHEMA_UID,
        data: {
          recipient: "0x0000000000000000000000000000000000000000", // Public attestation
          expirationTime: BigInt(0), // No expiration
          revocable: true,
          data: encodedData,
        },
      });

      const newAttestationUID = await tx.wait();
      
      setAttestationUID(newAttestationUID);
      setStatus("success");
      
      return newAttestationUID;

    } catch (error) {
      console.error("Attestation failed:", error);
      setStatus("error");
      throw error;
    } finally {
      // Reset status after a delay if needed, or keep as success/error
    }
  };

  return { attestDocument, status, attestationUID };
}
