module.exports = {
  clearMocks: true,
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFiles: ["./tests/dotenv.ts"],
  testMatch: [
    "<rootDir>/src/**/*.(test).{js,jsx,ts,tsx}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}",
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  coverageReporters: ["json", "lcov", "text", "clover", "json-summary"],
  reporters: [
    "default",
    [
      "jest-silent-reporter",
      { useDots: true, showWarnings: false, showPaths: true },
    ],
  ],
};
