import { resolveDomainToAddress } from "@azns/resolver-core";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { checkAddress } from "@polkadot/util-crypto";
import {
  alephzero,
  alephzeroTestnet,
  development,
  getBalance,
  getPSP22Balances,
  getSubstrateChain,
} from "@scio-labs/use-inkathon";
import Enquirer from "enquirer";
const { prompt } = Enquirer;

const main = async () => {
  const { chainId, addressOrDomain }: any = await prompt([
    {
      name: "chainId",
      type: "select",
      message: "Pick a network",
      choices: [alephzero, alephzeroTestnet, development].map((chain) => ({
        message: `${chain.name} (${chain.rpcUrls[0]})`,
        name: chain.network,
      })),
    },
    {
      name: "addressOrDomain",
      type: "input",
      message: "Type an address or domain to fetch balance for",
    },
  ]);

  // Connect to RPC
  const chain = getSubstrateChain(chainId);
  const provider = new WsProvider(chain.rpcUrls[0]);
  const api = await ApiPromise.create({ provider, noInitWarn: true });

  // Output network information
  const network = (await api.rpc.system.chain())?.toString() || "";
  const version = (await api.rpc.system.version())?.toString() || "";
  console.log(`\nInitialized API on ${network} (${version})`);

  // Validate address or domain
  const isAddress = checkAddress(addressOrDomain, 42)[0];
  const isDomain = /^[a-z0-9]+\.azero|tzero$/i.test(addressOrDomain);
  if (!isAddress && !isDomain)
    throw new Error("Invalid address or domain format. Aborting.");

  // Resolve domain to address if needed
  let address = addressOrDomain;
  if (isDomain) {
    const { address: resolvedAddress, error } = await resolveDomainToAddress(
      addressOrDomain,
      { chainId, customApi: api }
    );
    if (error) throw new Error(error.message);
    if (!resolvedAddress)
      throw new Error("Could not resolve domain. Aborting.");
    address = resolvedAddress;
  }

  // Fetch native token balance
  const { balanceFormatted } = await getBalance(api, address);
  console.log("\nAddress:", address);
  console.log(`Native Balance: ${balanceFormatted}`);

  // Fetch PSP22 token balances
  if (chain.network === alephzero.network) {
    console.log(`PSP22 Balances:`);
    const psp22BalanceData = await getPSP22Balances(api, address);
    for (const { balanceFormatted } of psp22BalanceData) {
      console.log(`  ‣ ${balanceFormatted}`);
    }
  }
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
