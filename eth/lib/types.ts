export type chain = {
  chainId: number;
  startHeight: number;
  currentHeight: number;
  bestBlockHash: string;
  blocks: string[];
};
