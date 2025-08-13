module.exports = {
    root: true,
    env: {
        browser: true,
        es2024: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        '@eslint/js/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.json',
    },
    plugins: [
        'react',
        'react-hooks',
        'react-refresh',
        'jsx-a11y',
        'import',
        '@typescript-eslint',
    ],
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    rules: {
        // React rules
        'react/react-in-jsx-scope': 'off', // React 17+ JSX Transform
        'react/prop-types': 'off', // TypeScript handles this
        'react/jsx-uses-react': 'off', // React 17+ JSX Transform
        'react/jsx-uses-vars': 'error',
        'react/jsx-no-unused-vars': 'error',
        'react/jsx-pascal-case': 'error',
        'react/no-array-index-key': 'warn',
        'react/no-unused-state': 'error',
        'react/prefer-stateless-function': 'warn',
        'react/self-closing-comp': 'error',
        'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],

        // React Hooks rules
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        // Import rules
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        'import/no-duplicates': 'error',
        'import/no-unresolved': 'error',
        'import/named': 'error',

        // General JavaScript/TypeScript rules
        'no-console': 'warn',
        'no-debugger': 'warn',
        'no-unused-vars': 'off', // TypeScript handles this
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        'prefer-const': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-template': 'error',

        // Accessibility rules
        'jsx-a11y/alt-text': 'error',
        'jsx-a11y/anchor-has-content': 'error',
        'jsx-a11y/click-events-have-key-events': 'warn',
        'jsx-a11y/no-static-element-interactions': 'warn',

        // Performance and best practices
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
    },
    overrides: [
        // TypeScript specific rules
        {
            files: ['**/*.ts', '**/*.tsx'],
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            rules: {
                '@typescript-eslint/no-explicit-any': 'warn',
                '@typescript-eslint/prefer-nullish-coalescing': 'error',
                '@typescript-eslint/prefer-optional-chain': 'error',
                '@typescript-eslint/no-unnecessary-type-assertion': 'error',
                '@typescript-eslint/no-floating-promises': 'error',
            },
        },
        // Test files
        {
            files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
            extends: ['plugin:testing-library/react', 'plugin:jest/recommended'],
            env: {
                jest: true,
            },
        },
        // Configuration files
        {
            files: ['*.config.{js,ts}', '*.config.*.{js,ts}'],
            env: {
                node: true,
            },
        },
    ],
    ignorePatterns: [
        'dist/',
        'build/',
        'node_modules/',
        '*.generated.*',
        'coverage/',
        '.next/',
        'out/',
    ],
}