"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import React, { useMemo } from "react";

const WalletConnection = ({ children }: { children: React.ReactNode }) => {
  const wallets = useMemo(() => [], []);
  console.log(process.env.NODE_ENV, "process.env.NODE_ENV");

  return (
    <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_RPC_ENDPOINT!}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletConnection;