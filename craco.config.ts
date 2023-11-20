import { CracoConfig } from "@craco/types";

const cracoConfig: CracoConfig = {
  jest: {
    configure: (jestConfig, { env, paths, resolve, rootDir }) => {
      jestConfig.setupFiles = [`${rootDir}/src/jest.polyfills.js`];
      return jestConfig;
    },
  },
};

export { cracoConfig as default };
