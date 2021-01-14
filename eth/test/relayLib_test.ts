import { expect } from "chai";
import { utils } from "ethers";
import { ethers } from "hardhat";
import Web3 from "web3";
import { RelayLib } from "../lib/relay";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");

describe("Relay Lib Tests", () => {
  it("Test_Lib", async () => {
    const relay = new RelayLib(provider);
    await relay.ready;
  });

  it("Test_GetMaxChainId", async () => {
    const relay = new RelayLib(provider);
    await relay.ready;

    expect(await relay.getMaxChainId()).to.equal(4);

    await relay.getAllChains();
  });

  it("Test_GetAllChains", async () => {
    const relay = new RelayLib(provider);
    await relay.ready;

    const chains = await relay.getAllChains();
    expect(chains.chains[0].bestBlockHash).to.equal(
      "0xba2242e65801900a336b6983e30deaa9666b6f554e6692ca3350b6543da7a2ea",
    );
    expect(chains.chains[0].chainId).to.equal(0);

    expect(chains.chains[3].bestBlockHash).to.equal(
      "0xc4cf2c7cf2158dc952d737df5f76196e18fbe5dddaacc6446436b8b5848605f7",
    );
    expect(chains.chains[3].chainId).to.equal(3);
    expect(chains.chains[3].startHeight).to.equal(11);
  });

  it("Test_GetBlocksForChainId", async () => {
    const relay = new RelayLib(provider);
    await relay.ready;

    const block = await relay.getBlocksForChainId(0, 0);
    expect(block).to.equal(
      "0x8c2923fbf03bb2343f8747f2149ea4fa3d130ff2e26c93b47216eec519286c17",
    );
  });

  it("Test_GetChainAtPosition", async () => {
    const relay = new RelayLib(provider);
    await relay.ready;

    const block = await relay.getChainAtPosition(0);
    expect(block.chainId).to.equal(0);
  });
});
