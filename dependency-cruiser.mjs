export default {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: 'no-core-config-to-not-core',
      from: { path: 'src/app/core/config' },
      to: { pathNot: 'src/app/core', path: 'src/app/core/api' },
    },
    {
      name: 'no-core-to-not-core',
      from: { path: 'src/app/core' },
      to: { pathNot: 'src/app/core' },
    },
    {
      name: 'no-all-to-environment',
      from: { pathNot: 'src/app/app.config.ts' },
      to: { path: 'src/environment' },
    },
  ],
  options: {
    tsConfig: {
      fileName: 'tsconfig.base.json',
    },
  },
};
