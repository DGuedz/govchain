"use client";

import { useState, useEffect } from "react";

const MOCK_WALLET_KEY = "govchain_mock_wallet";
const MOCK_ADDRESS = "0xSimulatedUserAddressForTesting123456789";

export function useMockWallet() {
  const [mockAddress, setMockAddress] = useState<string | null>(null);

  useEffect(() => {
    // Check local storage on mount
    const stored = localStorage.getItem(MOCK_WALLET_KEY);
    if (stored) {
      setMockAddress(stored);
    }
  }, []);

  const connectMock = () => {
    localStorage.setItem(MOCK_WALLET_KEY, MOCK_ADDRESS);
    setMockAddress(MOCK_ADDRESS);
    window.location.reload(); // Reload to refresh all hooks
  };

  const disconnectMock = () => {
    localStorage.removeItem(MOCK_WALLET_KEY);
    setMockAddress(null);
    window.location.reload();
  };

  return {
    mockAddress,
    connectMock,
    disconnectMock,
    isConnected: !!mockAddress
  };
}
