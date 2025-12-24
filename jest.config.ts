// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Enables TypeScript support in Jest
  testEnvironment: "jsdom", // Simulates a browser environment
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Points to the setup file
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Recognizes these file extensions
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transforms .ts and .tsx files
  },
};

export default config;