import { ApiPromise, WsProvider } from "@polkadot/api";
import { Abi } from "@polkadot/api-contract";
import { EventRecord } from "@polkadot/types/interfaces";
import { readFile } from "fs/promises";

const main = async () => {
  const RPC_URL = "wss://ws.test.azero.dev";
  const provider = new WsProvider(RPC_URL);
  const api = await ApiPromise.create({ provider, noInitWarn: true });

  // Output network information
  const network = (await api.rpc.system.chain())?.toString() || "";
  const version = (await api.rpc.system.version())?.toString() || "";
  console.log(`Initialized API on ${network} (${version})`);

  // Contract information
  // NOTE: This is using the AZERO.ID registry contract on the Aleph Zero testnet as an example
  const address = "5FsB91tXSEuMj6akzdPczAtmBaVKToqHmtAwSUzXh49AYzaD";
  const metadata = JSON.parse(await readFile("abi/azns_router.json", "utf8"));
  const abi = new Abi(metadata, api.registry.getChainProperties());

  // Listen to all events
  api.query.system.events((events: EventRecord[]) => {
    // Filter for contract events
    const contractEvents = events.filter((event) =>
      api.events.contracts.ContractEmitted.is(event.event)
    );
    if (!contractEvents?.length) return;
    console.log(`\nReceived ${contractEvents.length} contract event(s):`);

    // Log & optionally decode contract events
    for (const { event } of contractEvents) {
      const [contractAddress, contractEvent] = event.data;
      console.log(`Contract address: ${contractAddress}`);

      // Filter for specific contract address
      if (contractAddress.toString() !== address) continue;

      // Decode contract event
      try {
        const { event } = abi.decodeEvent(contractEvent as any);
        console.log("Decoded event:", event.identifier);
      } catch (e) {
        console.error("Failed to decode event:", e);
      }
    }
  });
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
