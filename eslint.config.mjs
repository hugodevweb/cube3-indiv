import nextConfig from 'eslint-config-next';

const eslintConfig = [
  ...(Array.isArray(nextConfig) ? nextConfig : [nextConfig]),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'backend/**',
      'out/**',
      'build/**',
      'dist/**',
      'coverage/**',
      'quality-reports/**',
      'load-tests/**',
    ],
  },
];

export default eslintConfig;
