import { expect } from "chai";
import { utils } from "ethers";
import { ethers } from "hardhat";

describe("Relay Smart Contract Tests", () => {
  it("Should return 'world' when calling hello function", async () => {
    const relaySC = await ethers.getContractFactory("Relay");
    const relay = await relaySC.deploy();

    await relay.deployed();

    expect(utils.parseBytes32String(await relay.hello())).to.equal("world");
  });
});
