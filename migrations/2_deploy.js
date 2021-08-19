const Oracle = artifacts.require("PriceOracle");

module.exports = function (deployer) {
  deployer.deploy(Oracle);
};
