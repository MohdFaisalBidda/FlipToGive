"use client";

import dynamic from "next/dynamic";
import React from "react";
const WalletConnection = dynamic(() => import("./WalletConnection"), {
    ssr: false,
  });
  
function WalletComponent({ children }: any) {
  return <WalletConnection>{children}</WalletConnection>;
}

export default WalletComponent;