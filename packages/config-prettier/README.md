# @ns-tech/config-prettier

Configuração padronizada do Prettier para projetos React modernos. Fornece regras de formatação consistentes e otimizadas para desenvolvimento em equipe, garantindo um código limpo e bem estruturado.

## Recursos

-   ✅ Configuração otimizada para React e TypeScript
-   ✅ Regras de formatação consistentes
-   ✅ Compatível com ESLint
-   ✅ Suporte para JSX/TSX
-   ✅ Configuração para projetos em equipe
-   ✅ Integração com editores populares

## Instalação

```bash
# No monorepo
pnpm add '@ns-tech/config-prettier@workspace:*' --save-dev

# Projeto externo (quando publicado)
npm install @ns-tech/config-prettier --save-dev
```

## Dependências

Este pacote requer as seguintes dependências em seu projeto:

```bash
npm install prettier --save-dev
```

## Configuração

### Opção 1: Arquivo .prettierrc.json

Crie um arquivo `.prettierrc.json` na raiz do seu projeto:

```json
"@ns-tech/config-prettier"
```

### Opção 2: Arquivo .prettierrc.js

Crie um arquivo `.prettierrc.js` na raiz do seu projeto:

```javascript
module.exports = require('@ns-tech/config-prettier');
```

### Opção 3: No package.json

```json
{
    "prettier": "@ns-tech/config-prettier"
}
```

## Configuração Incluída

```json
{
    "semi": true,
    "trailingComma": "es5",
    "singleQuote": true,
    "printWidth": 100,
    "tabWidth": 4,
    "useTabs": false,
    "quoteProps": "as-needed",
    "jsxSingleQuote": true,
    "bracketSpacing": true,
    "bracketSameLine": false,
    "arrowParens": "avoid",
    "endOfLine": "lf",
    "embeddedLanguageFormatting": "auto"
}
```

## Scripts Recomendados

Adicione estes scripts ao seu `package.json`:

```json
{
    "scripts": {
        "format": "prettier --write .",
        "format:check": "prettier --check .",
        "format:staged": "prettier --write"
    }
}
```

## Integração com ESLint

Use junto com `@ns-tech/config-eslint` para máxima compatibilidade:

```json
{
    "extends": ["@ns-tech/config-eslint"],
    "rules": {
        "prettier/prettier": "error"
    }
}
```

## Arquivo .prettierignore

Crie um arquivo `.prettierignore` na raiz do projeto:

```
node_modules/
dist/
build/
public/
coverage/
*.min.js
*.min.css
package-lock.json
pnpm-lock.yaml
yarn.lock
.next/
.nuxt/
.output/
.vercel/
```

## Integração com Editores

### VSCode

Instale a extensão Prettier e configure em `.vscode/settings.json`:

```json
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true,
    "prettier.requireConfig": true,
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[markdown]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```

### WebStorm/IntelliJ

1. Vá para `Settings` → `Languages & Frameworks` → `JavaScript` → `Prettier`
2. Marque `Automatic Prettier configuration`
3. Marque `On save` e `On code reformat`

## Git Hooks com Husky

Instale husky e lint-staged para formatação automática:

```bash
npm install husky lint-staged --save-dev
```

Configure no `package.json`:

```json
{
    "lint-staged": {
        "*.{js,jsx,ts,tsx,json,css,md}": ["prettier --write"]
    },
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    }
}
```

## Configuração Personalizada

Se precisar sobrescrever algumas regras:

```javascript
// .prettierrc.js
const baseConfig = require('@ns-tech/config-prettier');

module.exports = {
    ...baseConfig,
    // Suas personalizações
    printWidth: 80,
    tabWidth: 2,
};
```

## Exemplo de Código Formatado

**Antes:**

```typescript
import React, { useState, useEffect } from 'react';

interface Props {
    name: string;
    age?: number;
}

export const UserCard = ({ name, age = 18 }: Props) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className='user-card'>
            <h1>{name}</h1>
            {age && <p>Age: {age}</p>}
        </div>
    );
};
```

**Depois:**

```typescript
import React, { useState, useEffect } from 'react';

interface Props {
    name: string;
    age?: number;
}

export const UserCard = ({ name, age = 18 }: Props) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className='user-card'>
            <h1>{name}</h1>
            {age && <p>Age: {age}</p>}
        </div>
    );
};
```

## Comandos Úteis

```bash
# Formatar todos os arquivos
npx prettier --write .

# Verificar se arquivos estão formatados
npx prettier --check .

# Formatar arquivos específicos
npx prettier --write src/**/*.{ts,tsx}

# Verificar um arquivo específico
npx prettier --check src/components/Button.tsx
```

## Resolução de Problemas

### Conflitos com ESLint

Use `eslint-config-prettier` para desabilitar regras que conflitam:

```bash
npm install eslint-config-prettier --save-dev
```

```json
{
    "extends": ["@ns-tech/config-eslint", "prettier"]
}
```

### Prettier não está funcionando

1. Verifique se o arquivo de configuração existe
2. Reinicie o editor
3. Verifique se a extensão está instalada
4. Confirme que `prettier.requireConfig` está `true` no VSCode

## Licença

MIT
