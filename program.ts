import { Connection, PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import { CHARITIES, FLIP_AMOUNT } from "./lib/constants";


export async function createFlipInstruction(
    userPubKey: PublicKey,
    connection: Connection
): Promise<TransactionInstruction> {
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const charityIndex = currentTimestamp % CHARITIES.length
    const charityAddress = CHARITIES[charityIndex].address


    return SystemProgram.transfer({
        fromPubkey: userPubKey,
        toPubkey: charityAddress,
        lamports: FLIP_AMOUNT * 1_000_000_000 // Converted to lamport (0.1 sol)
    })
}

export async function executeFlip(
    connection: Connection,
    wallet: { publicKey: PublicKey; sendTransaction: any },
    onProgress: (status: string) => void
): Promise<{ success: boolean; result: 'heads' | 'tails'; txId?: string }> {
    try {
        if (!wallet?.publicKey || !wallet?.sendTransaction) {
            throw new Error("Wallet not connected or missing adapter methods");
        }

        if (!wallet.publicKey) throw new Error('Wallet not connected')

        onProgress('Preparing transaction...')

        //Client side randomness for now in real this would be by decide by the program
        const isHeads = Math.random() < 0.5

        if (!isHeads) {
            return { success: true, result: "tails" }
        }

        const instruction = await createFlipInstruction(wallet.publicKey, connection)
        const transaction = new Transaction().add(instruction)


        onProgress('Request Approval...')
        const signature = await wallet.sendTransaction(transaction, connection)

        onProgress("Confirming Transaction...")
        await connection.confirmTransaction(signature, "confirmed")

        return {
            success: true,
            result: "heads",
            txId: signature
        }
    } catch (error) {
        console.log("Flip failed", error);
        throw error
    }
} 