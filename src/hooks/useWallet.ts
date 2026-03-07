import { useState, useCallback } from "react";

const MOCK_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const connect = useCallback(async () => {
    setConnecting(true);
    await new Promise((r) => setTimeout(r, 800));
    setAddress(MOCK_ADDRESS);
    setConnecting(false);
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
  }, []);

  return { address, connecting, connect, disconnect };
}
