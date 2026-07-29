import { describe, it, expect } from "vitest";
import { defineConfig } from "../src/defineConfig.js";
import type { OrbitalConfig, ContractConfig } from "../src/defineConfig.js";

describe("defineConfig", () => {
  it("should return the same config object that was passed in", () => {
    const config: OrbitalConfig = {
      contracts: [{ contractId: "CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" }],
      outDir: "./generated",
    };

    const result = defineConfig(config);
    expect(result).toBe(config);
    expect(result).toEqual(config);
  });

  it("should work with full configuration options", () => {
    const config: OrbitalConfig = {
      contracts: [
        {
          contractId: "CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          name: "MyContract",
        },
        {
          contractId: "CBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
        },
      ],
      network: "testnet",
      rpcUrl: "https://soroban-testnet.stellar.org",
      registryContractId: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
      registryPublisher: "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      outDir: "./src/generated",
    };

    const result = defineConfig(config);
    expect(result).toEqual(config);
    expect(result.contracts).toHaveLength(2);
    expect(result.contracts[0].name).toBe("MyContract");
    expect(result.contracts[1].name).toBeUndefined();
  });

  it("should preserve type information for TypeScript", () => {
    // This test ensures the function provides proper typing
    const config = defineConfig({
      contracts: [{ contractId: "CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" }],
      outDir: "./generated",
    });

    // These should be properly typed without any type assertions
    expect(typeof config.contracts).toBe("object");
    expect(Array.isArray(config.contracts)).toBe(true);
    expect(typeof config.outDir).toBe("string");
  });

  it("should handle minimal configuration", () => {
    const config: OrbitalConfig = {
      contracts: [{ contractId: "CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" }],
      outDir: "./generated",
    };

    const result = defineConfig(config);
    expect(result.network).toBeUndefined();
    expect(result.rpcUrl).toBeUndefined();
    expect(result.registryContractId).toBeUndefined();
    expect(result.registryPublisher).toBeUndefined();
  });
});

describe("OrbitalConfig types", () => {
  it("should enforce required fields", () => {
    // This test ensures TypeScript compilation catches missing required fields
    const validConfig: OrbitalConfig = {
      contracts: [{ contractId: "CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" }],
      outDir: "./generated",
    };

    expect(validConfig).toBeDefined();
  });

  it("should allow optional contract name", () => {
    const contractWithName: ContractConfig = {
      contractId: "CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      name: "MyContract",
    };

    const contractWithoutName: ContractConfig = {
      contractId: "CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    };

    expect(contractWithName.name).toBe("MyContract");
    expect(contractWithoutName.name).toBeUndefined();
  });

  it("should allow valid network values", () => {
    const networks: Array<"mainnet" | "testnet" | "futurenet"> = [
      "mainnet",
      "testnet",
      "futurenet",
    ];

    networks.forEach((network) => {
      const config: OrbitalConfig = {
        contracts: [{ contractId: "CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" }],
        network,
        outDir: "./generated",
      };

      expect(config.network).toBe(network);
    });
  });
});
