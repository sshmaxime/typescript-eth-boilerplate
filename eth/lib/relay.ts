import { Relay } from "../typechain/Relay";
import { Relay__factory } from "../typechain/factories/Relay__factory";
import { BigNumber, ContractTransaction, ethers, utils } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { chain } from "./types";

// this remains constant if deployed on a fresh hardhat network
// (but will change if redeployed without restarting the network)
const localHardhatAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export class RelayLib {
  ready: Promise<void>;

  private relay: Relay;
  constructor(providerParam?: any) {
    this.ready = new Promise<void>(async (resolve, reject) => {
      let provider: any;

      try {
        if (!providerParam) {
          const web3 = await detectEthereumProvider();
          provider = new ethers.providers.Web3Provider(
            web3 as ethers.providers.ExternalProvider,
          );
          await (provider.provider as any).enable();
        } else {
          provider = new ethers.providers.Web3Provider(
            providerParam as ethers.providers.ExternalProvider,
          );
        }
        this.relay = Relay__factory.connect(
          localHardhatAddress,
          provider,
        ) as Relay;
        // useless
        if (utils.parseBytes32String(await this.relay.hello()) === "world") {
          return resolve();
        }
        return reject("Smart contract don't have hello function");
      } catch (error) {
        return reject(error);
      }
    });
  }

  async storeBlockHeader(
    block_height: number,
    block_hash: string,
    chain_id: number,
  ): Promise<ContractTransaction> {
    return await this.relay.store_block_header(
      block_height,
      block_hash,
      chain_id,
    );
  }

  getAllChains = async (): Promise<{
    chains: chain[];
    sortedChains: chain[];
  }> => {
    let arr: chain[] = [];
    for (let i = 0; i < (await this.getMaxChainId()); i++) {
      arr.push(await this.getChainAtPosition(i));
    }
    return {
      chains: arr,
      sortedChains: [...arr].sort((a, b) =>
        a.currentHeight < b.currentHeight ? -1 : 1,
      ),
    };
  };

  async getChainAtPosition(position: number): Promise<chain> {
    const vals = await this.relay.get_chain_at_position(position);

    let chainBlocks: string[] = [];

    if (vals[0].toNumber() !== 0) {
      for (let i = 0; i <= vals[1].toNumber(); i++) {
        chainBlocks.push(await this.getBlocksForChainId(0, i));
      }
      for (let i = vals[1].toNumber(); i <= vals[2].toNumber(); i++) {
        chainBlocks.push(await this.getBlocksForChainId(vals[0].toNumber(), i));
      }
    } else {
      for (let i = 0; i <= vals[2].toNumber(); i++) {
        chainBlocks.push(await this.getBlocksForChainId(0, i));
      }
    }

    return {
      chainId: vals[0].toNumber(),
      startHeight: vals[1].toNumber(),
      currentHeight: vals[2].toNumber(),
      bestBlockHash: vals[3].toString(),
      blocks: chainBlocks,
    };
  }

  async getBlocksForChainId(id: number, height: number): Promise<string> {
    return await this.relay.get_blocks_for_chain_id(id, height);
  }

  async getMaxChainId(): Promise<number> {
    return (await this.relay.get_max_chain_id()).toNumber();
  }
}
