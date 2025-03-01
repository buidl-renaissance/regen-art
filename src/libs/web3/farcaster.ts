import sdk from "@farcaster/frame-sdk";
import { SwitchChainError, fromHex, getAddress, numberToHex } from "viem";
import { ChainNotConfiguredError, createConnector } from "wagmi";

frameConnector.type = "frameConnector" as const;

export function frameConnector() {
  let connected = true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createConnector<typeof sdk.wallet.ethProvider>((config: any) => ({
    id: "farcaster",
    name: "Farcaster Wallet", 
    type: frameConnector.type,

    async setup() {
      try {
        await this.connect({ chainId: config.chains[0].id });
      } catch (error) {
        console.error("Setup error:", error);
      }
    },
    async connect({ chainId }: { chainId?: number } = {}) {
      try {
        const provider = await this.getProvider();
        if (!provider) throw new Error("Provider not found");

        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });

        let currentChainId = await this.getChainId();
        if (chainId && currentChainId !== chainId) {
          const chain = await this.switchChain!({ chainId });
          currentChainId = chain.id;
        }

        connected = true;

        return {
          accounts: accounts.map((x: string) => getAddress(x)),
          chainId: currentChainId,
        };
      } catch (error) {
        console.error("Connect error:", error);
        throw error;
      }
    },
    async disconnect() {
      connected = false;
    },
    async getAccounts() {
      if (!connected) throw new Error("Not connected");
      try {
        const provider = await this.getProvider();
        if (!provider) throw new Error("Provider not found");

        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        return accounts.map((x: string) => getAddress(x));
      } catch (error) {
        console.error("GetAccounts error:", error);
        throw error;
      }
    },
    async getChainId() {
      try {
        const provider = await this.getProvider();
        if (!provider) throw new Error("Provider not found");

        const hexChainId = await provider.request({ method: "eth_chainId" });
        return fromHex(hexChainId, "number");
      } catch (error) {
        console.error("GetChainId error:", error);
        throw error;
      }
    },
    async isAuthorized() {
      if (!connected) {
        return false;
      }

      try {
        const accounts = await this.getAccounts();
        return !!accounts.length;
      } catch (error) {
        console.error("IsAuthorized error:", error);
        return false;
      }
    },
    async switchChain({ chainId }: { chainId: number }) {
      try {
        const provider = await this.getProvider();
        if (!provider) throw new Error("Provider not found");

        const chain = config.chains.find((x: { id: number }) => x.id === chainId);
        if (!chain) throw new SwitchChainError(new ChainNotConfiguredError());

        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: numberToHex(chainId) }],
        });
        return chain;
      } catch (error) {
        console.error("SwitchChain error:", error);
        throw error;
      }
    },
    onAccountsChanged(accounts: string[]) {
      if (accounts.length === 0) this.onDisconnect();
      else
        config.emitter.emit("change", {
          accounts: accounts.map((x) => getAddress(x)),
        });
    },
    onChainChanged(chain: string) {
      const chainId = Number(chain);
      config.emitter.emit("change", { chainId });
    },
    async onDisconnect() {
      config.emitter.emit("disconnect");
      connected = false;
    },
    async getProvider() {
      try {
        const provider = sdk.wallet.ethProvider;
        if (!provider) throw new Error("Provider not found");
        return provider;
      } catch (error) {
        console.error("GetProvider error:", error);
        throw error;
      }
    },
  }));
}