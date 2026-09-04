import dts from "rollup-plugin-dts";

const config = [
  {
    input: "build/es6/spock.js",
    output: {
      file: "build/spock.mjs",
      format: "es",
      generatedCode: "es2015",
    },
  },
  {
    input: "build/es6/spock.d.ts",
    output: {
      file: "build/spock.d.mts",
      format: "es",
    },
    plugins: [dts()],
  },
];

export default config;
