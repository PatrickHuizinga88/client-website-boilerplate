import js from '@eslint/js';
import globals from 'globals';
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
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
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
    // Config-bestanden draaien in Node — process etc. moeten beschikbaar zijn.
    files: ['**/*.config.{js,mjs,cjs,ts,mts}', '**/eslint.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    // Astro components zijn meestal HTML-first; sommige TS-rules zijn er minder relevant.
    files: ['**/*.astro'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  {
    // Triple-slash refs zijn idiomatisch in Astro env.d.ts.
    files: ['**/env.d.ts', '**/*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },

  // Prettier komt als laatste — schakelt formatting-conflicten uit.
  prettier,
];
