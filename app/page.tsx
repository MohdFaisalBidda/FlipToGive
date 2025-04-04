"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Coins, Heart, LineChart, Trophy, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { executeFlip } from "@/program";
import Link from "next/link";
import { FLIP_AMOUNT } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { WalletMultiButtonDynamic } from "@/components/ClientWalletButton";

export default function Home() {
  const { toast } = useToast();
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [status, setStatus] = useState("");
  const [flipHistory, setFlipHistory] = useState<Array<"heads" | "tails">>([]);
  const [coinRotation, setCoinRotation] = useState(0);
  const [donationTotal, setDonationTotal] = useState(0);

  // Animation effect for coin flip
  useEffect(() => {
    if (isFlipping) {
      const interval = setInterval(() => {
        setCoinRotation((prev) => prev + 180);
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isFlipping]);

  const handleFlip = async () => {
    if (!publicKey || !connected) return;

    setIsFlipping(true);
    setStatus("Initiating flip...");

    try {
      const { success, result, txId } = await executeFlip(
        connection,
        { publicKey, sendTransaction },
        setStatus
      );

      if (success) {
        // Add some delay for better animation effect
        setTimeout(() => {
          setResult(result);
          setFlipHistory((prev) => [result, ...prev].slice(0, 5));

          if (result === "heads" && txId) {
            setDonationTotal((prev) => prev + FLIP_AMOUNT);
            toast({
              title: "Donation Successful! 🎉",
              description: `Transaction ID: ${txId.slice(0, 8)}...`,
            });
          }
        }, 1500);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsFlipping(false);
      setStatus("");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="md:col-span-2">
            <Card className="overflow-hidden border-2 border-muted">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 text-center border-b border-border">
                <h2 className="text-2xl font-bold mb-2">
                  Flip a Coin for Charity
                </h2>
                <p className="text-muted-foreground">
                  Make a difference with every flip
                </p>
              </div>

              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative mb-8">
                      <div
                        className={`w-40 h-40 rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-lg flex items-center justify-center text-primary-foreground text-4xl font-bold perspective-[1000px] transition-all duration-500 ease-in-out`}
                        style={{
                          transform: `rotateY(${coinRotation}deg)`,
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <div className="absolute inset-0 backface-hidden flex items-center justify-center">
                          <Heart className="w-20 h-20 text-primary-foreground" />
                        </div>
                        <div
                          className="absolute inset-0 backface-hidden flex items-center justify-center"
                          style={{ transform: "rotateY(180deg)" }}
                        >
                          <Coins className="w-20 h-20 text-primary-foreground" />
                        </div>
                      </div>

                      {isFlipping && (
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                          <Badge
                            variant="outline"
                            className="animate-pulse bg-background"
                          >
                            Flipping...
                          </Badge>
                        </div>
                      )}
                    </div>

                    {status && !isFlipping && (
                      <div className="text-center mb-4">
                        <p className="text-muted-foreground">{status}</p>
                      </div>
                    )}

                    <Button
                      size="lg"
                      onClick={handleFlip}
                      disabled={!connected || isFlipping}
                      className="w-full max-w-xs mx-auto relative overflow-hidden group"
                    >
                      <span className="relative z-10">
                        {!connected
                          ? "Connect Wallet to Play"
                          : isFlipping
                          ? "Flipping..."
                          : `Flip Coin (${FLIP_AMOUNT} SOL)`}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Heads</span>
                          <span className="text-sm font-medium">Tails</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{
                              width: `${
                                (flipHistory.filter((r) => r === "heads")
                                  .length /
                                  Math.max(1, flipHistory.length)) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="bg-muted/30 rounded-lg p-4">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <span>Flip Results</span>
                          {result && (
                            <Badge
                              className={
                                result === "heads"
                                  ? "bg-emerald-500"
                                  : "bg-amber-500"
                              }
                            >
                              {result === "heads" ? "Donated!" : "Try again"}
                            </Badge>
                          )}
                        </h3>

                        {result && (
                          <p className="text-lg font-medium mb-4">
                            {result === "heads"
                              ? "Thank you for your donation! ❤️"
                              : "Better luck next time! 🎲"}
                          </p>
                        )}

                        <div className="flex gap-2 flex-wrap">
                          {flipHistory.length > 0 ? (
                            flipHistory.map((item, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className={`${
                                  item === "heads"
                                    ? "border-emerald-500 text-emerald-500"
                                    : "border-amber-500 text-amber-500"
                                }`}
                              >
                                {item === "heads" ? "Heads" : "Tails"}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              No flips yet
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  <span>How it Works</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      1
                    </div>
                    <p className="text-muted-foreground">
                      Connect your Solana wallet
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      2
                    </div>
                    <p className="text-muted-foreground">
                      Click "Flip Coin" to start
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      3
                    </div>
                    <p className="text-muted-foreground">
                      <strong>Heads:</strong> {FLIP_AMOUNT} SOL donated to
                      charity
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      4
                    </div>
                    <p className="text-muted-foreground">
                      <strong>Tails:</strong> You keep your SOL
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-rose-500" />
                  <span>Donation Impact</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">
                        Total Donated
                      </span>
                      <span className="font-medium">
                        {donationTotal.toFixed(1)} SOL
                      </span>
                    </div>
                    <Progress
                      value={Math.min((donationTotal / 10) * 100, 100)}
                      className="h-2"
                    />
                  </div>

                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      Your donations help provide clean water, education, and
                      healthcare to communities in need.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <History className="h-5 w-5 text-sky-500" />
                  <span>Recent Donations</span>
                </h3>

                <div className="space-y-2">
                  {flipHistory.filter((item) => item === "heads").length > 0 ? (
                    flipHistory
                      .filter((item) => item === "heads")
                      .map((_, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center text-sm py-1 border-b border-border last:border-0"
                        >
                          <span className="text-muted-foreground">
                            Anonymous
                          </span>
                          <span className="font-medium">{FLIP_AMOUNT} SOL</span>
                        </div>
                      ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No donations yet. Be the first!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
