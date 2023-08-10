const { ethers, upgrades } = require('hardhat');

async function main() {
  const MockERC20Factory = await ethers.getContractFactory('MockERC20');
  const tknToken = await MockERC20Factory.deploy("TKN", "TKN");
  await tknToken.deployed();
  console.log(`TKN deployed to: `, tknToken.address);  

  const TestFactory = await ethers.getContractFactory('Test');
	const proxy = await upgrades.deployProxy(TestFactory);
  await proxy.deployed();
	console.log(`TestProxy deployed to: `, proxy.address);
  // await upgrades.upgradeProxy("0x9f7dced7631DeB3f4A858F3343D8Af4612F67f84", TestFactory);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
