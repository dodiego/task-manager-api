module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleNameMapper: {
    "^shared/(.*)$": "<rootDir>/src/shared/$1",
    "^core/(.*)$": "<rootDir>/src/core/$1",
    "^database$": "<rootDir>/src/database",
  },
  testMatch: ["**/?(*.)+(test|spec).ts"],
  testEnvironment: "node",
  setupFiles: ["./jest-setup.ts"],
};
