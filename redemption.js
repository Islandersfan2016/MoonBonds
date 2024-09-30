import { Network, Alchemy, Wallet, Utils } from "alchemy-sdk";
import dotenv from "dotenv";
dotenv.config();

const { API_KEY, PRIVATE_KEY } = process.env;

const settings = {
  apiKey: API_KEY,
  network: Network.SCROLL_SEPOLIA, // Replace with your network.
};

const alchemy = new Alchemy(settings);
const wallet = new Wallet(PRIVATE_KEY);

// Transaction created to bond token owners when bond token reaches maturity
const transaction = {
  to: "0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd",
  value: Utils.parseEther("0.001"),
  gasLimit: "21000",
  maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
  maxFeePerGas: Utils.parseUnits("20", "gwei"),
  nonce: await alchemy.core.getTransactionCount(wallet.getAddress()),
  type: 2,
  chainId: 1, // Corresponds to ETH_MAINNET
};

const rawTransaction = await wallet.signTransaction(transaction);
await alchemy.transact.sendTransaction(rawTransaction);
