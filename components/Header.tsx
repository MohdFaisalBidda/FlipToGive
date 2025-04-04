import React from "react";
import { WalletMultiButtonDynamic } from "./ClientWalletButton";
import { Coins, LineChart } from "lucide-react";
import Link from "next/link";

function Header() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
        <Link href="/">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <Coins className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              FlipToGive
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors px-4 py-2 rounded-md hover:bg-primary/10"
          >
            <LineChart className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <WalletMultiButtonDynamic
            style={{
              backgroundColor: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
              fontWeight: 500,
            }}
          />
        </div>
      </header>
    </div>
  );
}

export default Header;
