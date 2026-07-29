# defineConfig Function

The `defineConfig` function provides TypeScript support for `orbital.config.ts` files, enabling type checking and IntelliSense for orbital codegen configurations.

## Usage

```typescript
// orbital.config.ts
import { defineConfig } from '@orbital-stellar/abi-registry';

export default defineConfig({
  contracts: [
    { 
      contractId: 'CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      name: 'MyContract' // Optional: custom name for generated file
    },
    { 
      contractId: 'CBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'
      // No name - will use contractId
    }
  ],
  outDir: './generated', // Required: output directory
  network: 'testnet', // Optional: mainnet | testnet | futurenet
  rpcUrl: 'https://soroban-testnet.stellar.org', // Optional: custom RPC
  registryContractId: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', // Optional
  registryPublisher: 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', // Optional
});
```

## Configuration Options

### Required Fields

- **`contracts`**: Array of contract configurations to generate types for
- **`outDir`**: Output directory for generated TypeScript files

### Contract Configuration

- **`contractId`**: Stellar contract ID (C... format) - required  
- **`name`**: Optional custom name for the generated file (defaults to contractId)

### Optional Fields  

- **`network`**: Network to resolve contracts on (`mainnet` | `testnet` | `futurenet`)
- **`rpcUrl`**: Custom Soroban RPC endpoint (overrides network default)
- **`registryContractId`**: On-chain ABI registry contract ID for spec resolution  
- **`registryPublisher`**: Publisher address for registry lookups

## Type Safety

The function provides full TypeScript type checking:

```typescript
// ✅ Valid configuration
const config = defineConfig({
  contracts: [{ contractId: 'C...' }],
  outDir: './generated'
});

// ❌ TypeScript error - missing required fields
const invalid = defineConfig({
  contracts: [] // Error: must have at least one contract
});

// ❌ TypeScript error - invalid network
const badNetwork = defineConfig({
  contracts: [{ contractId: 'C...' }],
  outDir: './generated',
  network: 'invalid' // Error: must be mainnet | testnet | futurenet  
});
```

## Integration

This function is designed to work with the orbital codegen system (once PR #960 is merged) which will provide:

- `orbital codegen` - Generate types for all contracts in config
- `orbital codegen --check` - Check for drift without writing files
- `orbital.lock.json` - Lock file with spec hashes for drift detection