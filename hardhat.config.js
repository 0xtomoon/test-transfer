require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-watcher");
require("hardhat-gas-reporter");
require('solidity-coverage');
require('@openzeppelin/hardhat-upgrades');

const { alchemyApiKey, mnemonic, lineascanApiKey, coinmarketcapKey } = require('./secrets.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.10",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    lineaGoerli: {
      url: `https://rpc.goerli.linea.build/`,
      accounts: {mnemonic: mnemonic}
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${alchemyApiKey}`,
      accounts: {mnemonic: mnemonic}
    },
    hardhat: {
      initialBaseFeePerGas: 0,
    }
  },
  etherscan: {
    apiKey: {
      lineaGoerli: `${lineascanApiKey}`,
    },
    customChains: [
      {
        network: "lineaGoerli",
        chainId: 59140,
        urls: {
          apiURL: "https://api-testnet.lineascan.build/api",
          browserURL: "https://goerli.lineascan.build"
        }
      }
    ]  
  },
  watcher: {
    test: {
      tasks: [{ command: 'test', params: { testFiles: ['{path}'] } }],
      files: ['./test/**/*'],
      verbose: true
    }
  },
  gasReporter: {
    currency: 'USD',
    coinmarketcap: `${coinmarketcapKey}`,
    enabled: (process.env.REPORT_GAS) ? true : false
  }
};
