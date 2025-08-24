# @ns-tech/config-eslint

Configuração padronizada do ESLint para projetos React modernos. Fornece um conjunto de regras otimizadas para React 19, TypeScript 5.7+, hooks, acessibilidade e boas práticas de desenvolvimento.

## Recursos

-   ✅ Configuração otimizada para React 19 + TypeScript 5.7+
-   ✅ Regras para React Hooks com validação rigorosa
-   ✅ Verificações de acessibilidade (a11y) integradas
-   ✅ Regras de importação e organização de código
-   ✅ Suporte para React Refresh (Hot Reload)
-   ✅ Compatível com projetos Vite e Create React App

## Instalação

```bash
# No monorepo
pnpm add '@ns-tech/config-eslint@workspace:*' --save-dev

# Projeto externo (quando publicado)
npm install @ns-tech/config-eslint --save-dev
```

## Dependências

Este pacote requer as seguintes dependências em seu projeto:

```bash
npm install eslint typescript --save-dev
```

## Configuração

### Opção 1: Arquivo .eslintrc.js

Crie um arquivo `.eslintrc.js` na raiz do seu projeto:

```javascript
module.exports = {
    extends: ['@ns-tech/config-eslint'],
    // Adicione suas regras customizadas aqui
    rules: {
        // Exemplo: desabilitar regra específica
        // 'react/prop-types': 'off'
    },
};
```

### Opção 2: Arquivo .eslintrc.json

Crie um arquivo `.eslintrc.json` na raiz do seu projeto:

```json
{
    "extends": ["@ns-tech/config-eslint"],
    "rules": {
        // Suas regras customizadas aqui
    }
}
```

### Opção 3: No package.json

```json
{
    "eslintConfig": {
        "extends": ["@ns-tech/config-eslint"]
    }
}
```

## Scripts Recomendados

Adicione estes scripts ao seu `package.json`:

```json
{
    "scripts": {
        "lint": "eslint src --ext .ts,.tsx,.js,.jsx",
        "lint:fix": "eslint src --ext .ts,.tsx,.js,.jsx --fix",
        "lint:check": "eslint src --ext .ts,.tsx,.js,.jsx --max-warnings 0"
    }
}
```

## Regras Incluídas

### Core ESLint

-   Regras básicas de JavaScript/TypeScript
-   Prevenção de erros comuns
-   Boas práticas de codificação

### React & React Hooks

-   Regras para componentes funcionais
-   Validação de hooks (useEffect, useState, etc.)
-   Otimizações de performance
-   Regras de JSX

### TypeScript

-   Verificação de tipos rigorosa
-   Regras específicas para TS
-   Integração com compilador TypeScript

### Acessibilidade (a11y)

-   Verificações de ARIA
-   Elementos semânticos
-   Navegação por teclado
-   Contraste e usabilidade

### Importações

-   Organização de imports
-   Detecção de dependências não utilizadas
-   Resolução de módulos TypeScript

## Configuração Avançada

### Ignorar arquivos específicos

Crie um arquivo `.eslintignore`:

```
node_modules/
dist/
build/
public/
*.config.js
coverage/
```

### Sobrescrever regras para arquivos específicos

```javascript
module.exports = {
    extends: ['@ns-tech/config-eslint'],
    overrides: [
        {
            files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
            rules: {
                // Regras específicas para arquivos de teste
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
        {
            files: ['**/*.config.{js,ts}'],
            rules: {
                // Regras para arquivos de configuração
                'import/no-default-export': 'off',
            },
        },
    ],
};
```

### Integração com VSCode

Crie ou atualize `.vscode/settings.json`:

```json
{
    "eslint.enable": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    },
    "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```

## Resolução de Problemas

### Erro: "Cannot resolve configuration"

```bash
# Instale as dependências peer
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

### Conflitos com Prettier

Este pacote é compatível com Prettier. Use junto com `@ns-tech/config-prettier`:

```json
{
    "extends": ["@ns-tech/config-eslint", "@ns-tech/config-prettier"]
}
```

### Performance em projetos grandes

```javascript
module.exports = {
    extends: ['@ns-tech/config-eslint'],
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    settings: {
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
        },
    },
};
```

## Exemplo de Uso

```typescript
// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

export function Button({ children, onClick, disabled = false }: ButtonProps) {
    return (
        <button
            type='button'
            onClick={onClick}
            disabled={disabled}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50'
        >
            {children}
        </button>
    );
}
```

## Plugins Incluídos

-   `@typescript-eslint/eslint-plugin` - Regras TypeScript
-   `eslint-plugin-react` - Regras React
-   `eslint-plugin-react-hooks` - Regras para React Hooks
-   `eslint-plugin-jsx-a11y` - Regras de acessibilidade
-   `eslint-plugin-import` - Regras de importação
-   `eslint-plugin-react-refresh` - Suporte React Refresh

## Licença

MIT
