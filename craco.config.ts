import { CracoConfig } from "@craco/types";

const cracoConfig: CracoConfig = {
  jest: {
    configure: (jestConfig, { env, paths, resolve, rootDir }) => {
      return {
        ...jestConfig,
        setupFiles: [`${rootDir}/src/jest.polyfills`],
      };
    },
  },
};

export { cracoConfig as default };
