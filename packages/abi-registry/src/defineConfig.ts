/**
 * Configuration types for orbital.config.ts contract manifests
 */

export interface ContractConfig {
  /** Contract ID (C...) */
  contractId: string;
  /** Optional custom name for the generated types (defaults to contractId) */
  name?: string;
}

export interface OrbitalConfig {
  /** Array of contracts to generate types for */
  contracts: ContractConfig[];
  /** Network to resolve contracts on */
  network?: "mainnet" | "testnet" | "futurenet";
  /** Custom RPC URL (overrides network default) */
  rpcUrl?: string;
  /** On-chain ABI registry contract to resolve against first */
  registryContractId?: string;
  /** Publisher address to resolve on-chain specs under */
  registryPublisher?: string;
  /** Output directory for generated files */
  outDir: string;
}

/**
 * Defines an orbital configuration with proper typing.
 *
 * This provides TypeScript intellisense and type checking for orbital.config.ts files.
 *
 * @example
 * ```typescript
 * // orbital.config.ts
 * import { defineConfig } from '@orbital-stellar/abi-registry';
 *
 * export default defineConfig({
 *   contracts: [
 *     { contractId: 'CXXX...', name: 'MyContract' },
 *     { contractId: 'CYYY...' }, // uses contractId as name
 *   ],
 *   network: 'testnet',
 *   outDir: './generated',
 * });
 * ```
 */
export function defineConfig(config: OrbitalConfig): OrbitalConfig {
  return config;
}
