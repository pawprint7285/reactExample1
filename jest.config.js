module.exports = {
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  transform: {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/jest-transformer.js"
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/tools/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tools/fileMock.js"
  },
  testEnvironment: "node",
  coverageDirectory: "coverage",
  coverageReporters: ["json", "text-summary", "clover", "html"],
  globals: {},
  coverageThreshold: {
    global: {
      statements: 40,
      branches: 20,
      functions: 18,
      lines: 40
    }
  },
  setupFilesAfterEnv: ["<rootDir>/tools/testSetup.js"]
};
