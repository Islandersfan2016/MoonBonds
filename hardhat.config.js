/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.27',
  networks: {
    scroll: {
      url: 'https://sepolia-rpc.scroll.io/', // Insert your RPC URL here
      chainId: 534351 //(0x8274f),
      accounts: ['INSERT_PRIVATE_KEY'],
    },
  },
};