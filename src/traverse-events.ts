import { ApiPromise, WsProvider } from "@polkadot/api";
import { EventRecord } from "@polkadot/types/interfaces";

const main = async () => {
  const RPC_URL = "wss://ws.test.azero.dev";
  const provider = new WsProvider(RPC_URL);
  const api = await ApiPromise.create({ provider, noInitWarn: true });

  // Output network information
  const network = (await api.rpc.system.chain())?.toString() || "";
  const version = (await api.rpc.system.version())?.toString() || "";
  console.log(`Initialized API on ${network} (${version})`);

  // Log events in block
  // https://polkadot.js.org/docs/api/cookbook/blocks
  const blockHash = await api.rpc.chain.getBlockHash(1);
  const apiAt = await api.at(blockHash);
  const allRecords = await apiAt.query.system.events<EventRecord[]>();

  allRecords.forEach(({ event, phase }) => {
    if (api.events.system.ExtrinsicSuccess.is(event)) {
      console.log("ExtrinsicSuccess Event:", event);
    }
  });
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
