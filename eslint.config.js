import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astroPlugin from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.astro/**',
      '**/.output/**',
      '**/build/**',
      '**/.wrangler/**',
      '**/.vercel/**',
      '**/.netlify/**',
      'apps/studio/dist/**',
      'apps/web/src/lib/sanity/types.generated.ts',
      'pnpm-lock.yaml',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs.recommended,

  {
    files: ['**/*.{ts,tsx,astro}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  {
    // Astro components zijn meestal HTML-first; sommige TS-rules zijn er minder relevant.
    files: ['**/*.astro'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  // Prettier komt als laatste — schakelt formatting-conflicten uit.
  prettier,
];
