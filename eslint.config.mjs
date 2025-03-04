import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['node_modules', '.next', 'out', 'public', 'dist', 'build'],
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
            'unknown',
          ],

          pathGroups: [
            {
              pattern: 'next',
              group: 'builtin',
            },
            {
              pattern: 'next/',
              group: 'builtin',
            },
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@tanstack/',
              group: 'external',
            },
            {
              pattern: '@/components/**',
              group: 'internal',
            },
            {
              pattern: '@/libs/**',
              group: 'unknown',
            },
            {
              pattern: '@/core/**',
              group: 'unknown',
            },
            {
              pattern: '@/store/**',
              group: 'unknown',
            },
            {
              pattern: '**/*.css.ts',
              group: 'unknown',
              position: 'after',
            },
          ],

          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]

export default eslintConfig
