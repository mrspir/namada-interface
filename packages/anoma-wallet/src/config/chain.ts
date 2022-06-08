export type Protocol = "http" | "https" | "ws" | "wss";

const {
  REACT_APP_LOCAL,
  REACT_APP_LOCAL_LEDGER_ADDRESS,
  REACT_APP_LOCAL_CHAIN_PORT,
  REACT_APP_LOCAL_CHAIN_ID,
  REACT_APP_LOCAL_FAUCET,
} = process.env;

const DEFAULT_PORT = 26657;

type IbcDestination = {
  id: string;
  alias: string;
  portId: string;
};

export type NetworkConfig = {
  url: string;
  port: number;
  protocol: Protocol;
  wsProtocol: Protocol;
};

export type Chain = {
  id: string;
  alias: string;
  accountIndex: number;
  faucet?: string;
  network: NetworkConfig;
  ibc: IbcDestination[];
};

export const defaultChainId =
  REACT_APP_LOCAL_CHAIN_ID || "anoma-test.fd58c789bc11e6c6392";

const CHAIN_A_ID = "anoma-test.a3f2e831ac21178f5fb";
const CHAIN_B_ID = "anoma-test.db3b577a0da7edb19ac";
const CHAIN_A_ALIAS = "Anoma Fractal Instance - A";
const CHAIN_B_ALIAS = "Anoma Fractal Instance - B";

const DEFAULT_IBC_PORT = "transfer";

/**
 * TODO: Fetch all IBC-enabled chains in ecosystem
 */
const ibcEnabledChains = [
  {
    id: CHAIN_A_ID,
    alias: CHAIN_A_ALIAS,
    portId: DEFAULT_IBC_PORT,
  },
  {
    id: CHAIN_B_ID,
    alias: CHAIN_B_ALIAS,
    portId: DEFAULT_IBC_PORT,
  },
];

/**
 * TODO: Load ChainConfig from JSON.
 * TODO: Only load local configs (REACT_APP_LOCAL_*) if running in "local" mode
 * The following config is to support all current features, and serve as a segue to
 * requesting network configurations by other means.
 */
const ChainConfig: Record<string, Chain> = {
  /**
   * Default chain config
   */
  [defaultChainId]: {
    id: defaultChainId,
    alias: "Namada",
    accountIndex: 0,
    faucet: REACT_APP_LOCAL_FAUCET,
    network: {
      url: REACT_APP_LOCAL_LEDGER_ADDRESS || "127.0.0.1",
      port: REACT_APP_LOCAL_CHAIN_PORT
        ? parseInt(REACT_APP_LOCAL_CHAIN_PORT)
        : DEFAULT_PORT,
      protocol: REACT_APP_LOCAL ? "http" : "https",
      wsProtocol: REACT_APP_LOCAL ? "ws" : "wss",
    },
    ibc: ibcEnabledChains,
  },
  /**
   * Example instance config
   */
  [CHAIN_A_ID]: {
    id: CHAIN_A_ID,
    alias: CHAIN_A_ALIAS,
    accountIndex: 998,
    faucet:
      "atest1v4ehgw36xqcnzdpkgdzrw3pcg5crgvf4gfp5g3p4xumrj32xx9rrj3jrxycnxsfeggens3fs5ryrdh",
    network: {
      url: "10.7.1.159",
      port: 27657,
      protocol: "http",
      wsProtocol: "ws",
    },
    ibc: ibcEnabledChains.filter((ibcChain) => ibcChain.id !== CHAIN_A_ID),
  },
  /**
   * Example instance config
   */
  [CHAIN_B_ID]: {
    id: CHAIN_B_ID,
    alias: CHAIN_B_ALIAS,
    accountIndex: 999,
    faucet:
      "atest1v4ehgw36gfrrydf4xseyyvjrgs6nvdfjx5myz3pkxce5vd3kgcenxseexpry23jzxqerjvfszfqxng",
    network: {
      url: "10.7.1.147",
      port: 27657,
      protocol: "http",
      wsProtocol: "ws",
    },
    ibc: ibcEnabledChains.filter((ibcChain) => ibcChain.id !== CHAIN_B_ID),
  },
};

export default ChainConfig;
