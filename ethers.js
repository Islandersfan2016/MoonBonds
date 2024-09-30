import { WebSocketProvider } from "ethers";

// request to monitor bond transactions
async function subscribeToMinedTransactions() {
  const provider = new WebSocketProvider(
    "wss://scroll-sepolia.g.alchemy.com/v2/oQ5jbanceS_RNgPSqHSrKdimLWPwH14h"
  );

  // Send the subscription request manually
  const subscriptionId = await provider.send("eth_subscribe", [
    "alchemy_minedTransactions",
    {
      addresses: [
        {
          to: "0x9f3ce0ad29b767d809642a53c2bccc9a130659d7",
          from: "0x228f108fd09450d083bb33fe0cc50ae449bc7e11",
        },
        { to: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
      ],
      includeRemoved: false,
      hashesOnly: true,
    },
  ]);

  console.log("Subscribed with ID:", subscriptionId);

  // Handle the incoming messages manually
  provider.websocket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (
      data.method === "eth_subscription" &&
      data.params.subscription === subscriptionId
    ) {
      console.log("Mined transaction data:", data.params.result);
    }
  };

  provider.websocket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  provider.websocket.onclose = () => {
    console.log("WebSocket connection closed");
  };
}

// Start the subscription
subscribeToMinedTransactions();