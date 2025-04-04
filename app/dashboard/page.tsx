"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  BarChart,
  BarChartIcon as ChartIcon,
  Coins,
  Heart,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { CHARITIES } from "@/lib/constants";

export default function Dashboard() {
  const { connected } = useWallet();
  const { connection } = useConnection();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Heart className="h-6 w-6 text-destructive" />
              <h3 className="text-xl font-semibold">Total Donated</h3>
            </div>
            <p className="text-3xl font-bold">25.5 SOL</p>
            <p className="text-muted-foreground">≈ $640.32 USD</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Coins className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Total Flips</h3>
            </div>
            <p className="text-3xl font-bold">512</p>
            <p className="text-muted-foreground">Last 30 days</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <ChartIcon className="h-6 w-6 text-green-500" />
              <h3 className="text-xl font-semibold">Success Rate</h3>
            </div>
            <p className="text-3xl font-bold">48.2%</p>
            <p className="text-muted-foreground">Heads ratio</p>
          </Card>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Supported Charities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHARITIES.map((charity, index) => (
            <Card key={index} className="overflow-hidden">
              <img
                src={charity.image}
                alt={charity.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{charity.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {charity.description}
                </p>
                <a
                  href={charity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  Visit Website →
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
