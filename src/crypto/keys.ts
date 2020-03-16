import {KeyPairState, Wallet} from "../interfaces";
import {convertStringTo8UintArray} from "../util";
import nacl from "tweetnacl";
import {InvalidSeedError} from "./error";


// Generates ed25519 public/private keypair from seed
function generateKeyPairFromSeed(seedString: string): KeyPairState {
  if (seedString.length < 32) { throw new InvalidSeedError(); }
  const seed = convertStringTo8UintArray(seedString.substr(0, 32));
  return nacl.sign.keyPair.fromSeed(seed);
}

// Generate keypair from metamask wallet interface using app key
export async function generateKeys(wallet: Wallet): Promise<KeyPairState> {
  const appKey = await wallet.getAppKey();
  const keypair = generateKeyPairFromSeed(appKey);
  wallet.updatePluginState({polkadot: {account: keypair}});
  return keypair;
}


