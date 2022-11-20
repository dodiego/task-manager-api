module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "node",
  setupFiles: ["./jest-setup.ts"],
};
