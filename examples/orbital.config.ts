import { defineConfig } from '@orbital-stellar/abi-registry';

// Example orbital.config.ts configuration
export default defineConfig({
  contracts: [
    {
      contractId: 'CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      name: 'MySmartContract'
    },
    {
      contractId: 'CBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
      // No name provided - will use contractId as filename
    },
    {
      contractId: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      name: 'TokenContract'
    }
  ],
  network: 'testnet',
  outDir: './src/generated',
  // Optional: custom RPC endpoint
  rpcUrl: 'https://soroban-testnet.stellar.org',
  // Optional: registry configuration
  registryContractId: 'CDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  registryPublisher: 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
});