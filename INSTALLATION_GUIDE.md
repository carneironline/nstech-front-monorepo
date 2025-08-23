# Guia de Instalação dos Pacotes NS-Tech

Este documento fornece instruções detalhadas sobre como instalar e configurar cada pacote do monorepo NS-Tech em projetos externos.

## Visão Geral dos Pacotes

O monorepo NS-Tech contém os seguintes pacotes:

-   **@ns-tech/config-eslint**: Configuração padronizada do ESLint para projetos React
-   **@ns-tech/config-prettier**: Configuração padronizada do Prettier para formatação de código
-   **@ns-tech/config-tsconfig**: Configuração base do TypeScript otimizada para projetos React modernos
-   **@nstech/i18n**: Pacote de internacionalização com i18next para aplicações React
-   **@ns-tech/react-base**: Biblioteca de hooks React utilitários
-   **@ns-tech/ui**: Sistema de design de componentes UI (em desenvolvimento)

---

## 1. @ns-tech/config-eslint

### Instalação do ESLint Config

```bash
npm install @ns-tech/config-eslint --save-dev
# ou
yarn add @ns-tech/config-eslint --dev
# ou
pnpm add @ns-tech/config-eslint --save-dev
```

### Configuração do ESLint

#### Opção 1: Arquivo .eslintrc.js

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

#### Opção 2: Arquivo .eslintrc.json

Crie um arquivo `.eslintrc.json` na raiz do seu projeto:

```json
{
    "extends": ["@ns-tech/config-eslint"],
    "rules": {
        // Suas regras customizadas aqui
    }
}
```

#### Opção 3: Configuração no package.json

Adicione no seu `package.json`:

```json
{
    "eslintConfig": {
        "extends": ["@ns-tech/config-eslint"]
    }
}
```

### Dependências Peer do ESLint

Certifique-se de instalar as dependências peer necessárias:

```bash
npm install eslint eslint-plugin-react --save-dev
```

### Script ESLint no package.json

Adicione scripts para linting no seu `package.json`:

```json
{
    "scripts": {
        "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
        "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix"
    }
}
```

---

## 2. @ns-tech/config-prettier

### Instalação do Prettier Config

```bash
npm install @ns-tech/config-prettier --save-dev
# ou
yarn add @ns-tech/config-prettier --dev
# ou
pnpm add @ns-tech/config-prettier --save-dev
```

### Configuração do Prettier

#### Opção 1: Arquivo .prettierrc.json

Crie um arquivo `.prettierrc.json` na raiz do seu projeto:

```json
"@ns-tech/config-prettier"
```

#### Opção 2: Arquivo .prettierrc.js

Crie um arquivo `.prettierrc.js` na raiz do seu projeto:

```javascript
module.exports = require('@ns-tech/config-prettier');
```

#### Opção 3: Configuração Prettier no package.json

Adicione no seu `package.json`:

```json
{
    "prettier": "@ns-tech/config-prettier"
}
```

### Dependências Peer do Prettier

```bash
npm install prettier --save-dev
```

### Scripts Prettier no package.json

```json
{
    "scripts": {
        "format": "prettier --write .",
        "format:check": "prettier --check ."
    }
}
```

### Configuração Aplicada

O pacote aplica as seguintes configurações:

-   `semi: false` - Sem ponto e vírgula
-   `singleQuote: true` - Aspas simples
-   `trailingComma: "all"` - Vírgula final em objetos e arrays
-   `tabWidth: 4` - Indentação de 4 espaços

---

## 3. @ns-tech/config-tsconfig

### Instalação do TypeScript Config

```bash
npm install @ns-tech/config-tsconfig --save-dev
# ou
yarn add @ns-tech/config-tsconfig --dev
# ou
pnpm add @ns-tech/config-tsconfig --save-dev
```

### Configuração do TypeScript

Crie ou modifique seu arquivo `tsconfig.json` na raiz do projeto:

```json
{
    "extends": "@ns-tech/config-tsconfig/tsconfig.base.json",
    "include": ["**/*.ts", "**/*.tsx"],
    "compilerOptions": {
        "types": ["vite/client"], // Se usando Vite
        "baseUrl": ".",
        "paths": {
            "@/*": ["./src/*"] // Exemplo de path mapping
        }
    }
}
```

### Dependências Peer do TypeScript

```bash
npm install typescript --save-dev
```

### Configurações Incluídas

-   **Target**: ES2024
-   **JSX**: react-jsx (React 17+ transform)
-   **Module**: ESNext
-   **Libs**: ES2022, DOM, DOM.Iterable
-   **Module Resolution**: bundler (para Vite/Webpack)
-   **Strict Mode**: Habilitado
-   **Linting**: noUnusedLocals, noUnusedParameters, noFallthroughCasesInSwitch

---

## 4. @nstech/i18n

### Instalação do Pacote de Internacionalização

```bash
npm install @nstech/i18n i18next react-i18next
# ou
yarn add @nstech/i18n i18next react-i18next
# ou
pnpm add @nstech/i18n i18next react-i18next
```

### Configuração Básica

#### 1. Criar arquivos de tradução

```
src/
├── locales/
│   ├── pt-BR/
│   │   └── common.json
│   └── en/
│       └── common.json
└── i18n.ts
```

**src/locales/pt-BR/common.json:**

```json
{
    "welcome": "Bem-vindo ao dashboard",
    "greeting": "Olá, {{name}}!",
    "switchLanguage": "Trocar idioma"
}
```

**src/locales/en/common.json:**

```json
{
    "welcome": "Welcome to the dashboard",
    "greeting": "Hello, {{name}}!",
    "switchLanguage": "Switch language"
}
```

#### 2. Configurar instância i18n

**src/i18n.ts:**

```typescript
import { initI18n } from '@nstech/i18n';
import pt from './locales/pt-BR/common.json';
import en from './locales/en/common.json';

export const i18nInstance = initI18n(
    {
        'pt-BR': { translation: pt },
        en: { translation: en },
    },
    'pt-BR' // idioma padrão
);
```

#### 3. Configurar Provider na aplicação

**src/main.tsx (React com Vite):**

```tsx
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { I18nProvider } from '@nstech/i18n';
import { i18nInstance } from './i18n';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <I18nProvider i18nInstance={i18nInstance}>
            <App />
        </I18nProvider>
    </StrictMode>
);
```

**src/index.tsx (Create React App):**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nProvider } from '@nstech/i18n';
import { i18nInstance } from './i18n';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <I18nProvider i18nInstance={i18nInstance}>
            <App />
        </I18nProvider>
    </React.StrictMode>
);
```

### Uso nos Componentes

#### Hook useTranslation

```tsx
import { useTranslation } from '@nstech/i18n';

function MyComponent() {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'pt-BR' : 'en');
    };

    return (
        <div>
            <h1>{t('welcome')}</h1>
            <p>{t('greeting', { name: 'João' })}</p>
            <button onClick={handleLanguageChange}>{t('switchLanguage')}</button>
        </div>
    );
}
```

#### Componente de Seletor de Idiomas

```tsx
import { useTranslation } from '@nstech/i18n';

function LanguageSelector() {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'pt-BR', name: 'Português' },
        { code: 'en', name: 'English' },
    ];

    return (
        <select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
            {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                    {lang.name}
                </option>
            ))}
        </select>
    );
}
```

### Configuração com Múltiplos Namespaces

```typescript
// src/i18n.ts
import { initI18n } from '@nstech/i18n';
import commonPt from './locales/pt-BR/common.json';
import commonEn from './locales/en/common.json';
import errorsPt from './locales/pt-BR/errors.json';
import errorsEn from './locales/en/errors.json';

export const i18nInstance = initI18n(
    {
        'pt-BR': {
            common: commonPt,
            errors: errorsPt,
        },
        en: {
            common: commonEn,
            errors: errorsEn,
        },
    },
    'pt-BR'
);
```

```tsx
// Uso com namespace específico
const { t } = useTranslation('errors');
const errorMessage = t('invalidCredentials');
```

### Recursos Disponíveis

-   ✅ Configuração simplificada do i18next
-   ✅ Provider React para contexto de i18n
-   ✅ Todos os hooks do react-i18next disponíveis
-   ✅ Suporte a interpolação de variáveis
-   ✅ Suporte a múltiplos namespaces
-   ✅ TypeScript incluído
-   ✅ Detecção automática de idioma do navegador (configurável)

---

## 5. @ns-tech/react-base

### Instalação do React Base

```bash
npm install @ns-tech/react-base
# ou
yarn add @ns-tech/react-base
# ou
pnpm add @ns-tech/react-base
```

### Dependências Peer do React Base

```bash
npm install react
```

### Hooks Disponíveis

#### useDebounce

Hook para debounce de valores (útil para campos de busca):

```tsx
import { useDebounce } from '@ns-tech/react-base';
import { useEffect, useState } from 'react';

function SearchComponent() {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500); // 500ms de delay

    useEffect(() => {
        if (debouncedSearch) {
            // Fazer a busca apenas depois do delay
            console.log('Buscando por:', debouncedSearch);
        }
    }, [debouncedSearch]);

    return (
        <input
            type='text'
            placeholder='Digite para buscar...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}
```

#### useLocalStorage

Hook para gerenciar estado no localStorage:

```tsx
import { useLocalStorage } from '@ns-tech/react-base';

function SettingsComponent() {
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    const [language, setLanguage] = useLocalStorage('language', 'pt-BR');

    return (
        <div>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                Tema atual: {theme}
            </button>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value='pt-BR'>Português</option>
                <option value='en-US'>English</option>
            </select>
        </div>
    );
}
```

---

## 6. @ns-tech/ui (Em Desenvolvimento)

### Instalação do UI Design System

```bash
npm install @ns-tech/ui
# ou
yarn add @ns-tech/ui
# ou
pnpm add @ns-tech/ui
```

### Dependências do UI

```bash
npm install react clsx
```

**Nota**: Este pacote está atualmente em desenvolvimento e não possui componentes implementados ainda.

---

## Configuração Completa para um Novo Projeto

### 1. Instalação de Todos os Pacotes

```bash
# Dependências de produção
npm install @ns-tech/react-base @ns-tech/ui

# Dependências de desenvolvimento
npm install @ns-tech/config-eslint @ns-tech/config-prettier @ns-tech/config-tsconfig --save-dev

# Dependências peer necessárias
npm install react eslint eslint-plugin-react prettier typescript --save-dev
```

### 2. Estrutura de Arquivos de Configuração

Crie os seguintes arquivos na raiz do seu projeto:

#### tsconfig.json

```json
{
    "extends": "@ns-tech/config-tsconfig/tsconfig.base.json",
    "include": ["**/*.ts", "**/*.tsx"],
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["./src/*"]
        }
    }
}
```

#### .eslintrc.json

```json
{
    "extends": ["@ns-tech/config-eslint"]
}
```

#### .prettierrc.json

```json
"@ns-tech/config-prettier"
```

#### .prettierignore

```gitignore
node_modules
dist
build
coverage
.next
```

#### .eslintignore

```gitignore
node_modules
dist
build
coverage
.next
```

### 3. Scripts no package.json

```json
{
    "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
        "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
        "format": "prettier --write .",
        "format:check": "prettier --check .",
        "type-check": "tsc --noEmit"
    }
}
```

---

## Exemplo Prático de Uso

Aqui está um exemplo completo de como usar os pacotes em um componente React:

```tsx
// src/components/SearchExample.tsx
import React, { useEffect } from 'react';
import { useDebounce, useLocalStorage } from '@ns-tech/react-base';

interface SearchExampleProps {
    onSearch: (query: string) => void;
}

export function SearchExample({ onSearch }: SearchExampleProps) {
    const [query, setQuery] = useLocalStorage('searchQuery', '');
    const [searchHistory, setSearchHistory] = useLocalStorage<string[]>('searchHistory', []);
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        if (debouncedQuery.trim()) {
            onSearch(debouncedQuery);

            // Adicionar ao histórico
            setSearchHistory((prev) => {
                const newHistory = [debouncedQuery, ...prev.filter((item) => item !== debouncedQuery)];
                return newHistory.slice(0, 10); // Manter apenas os 10 mais recentes
            });
        }
    }, [debouncedQuery, onSearch, setSearchHistory]);

    return (
        <div className='search-container'>
            <input
                type='text'
                placeholder='Digite sua busca...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='w-full p-2 border rounded'
            />

            {searchHistory.length > 0 && (
                <div className='mt-2'>
                    <p className='text-sm text-gray-600'>Histórico de buscas:</p>
                    <ul className='text-sm'>
                        {searchHistory.slice(0, 5).map((item, index) => (
                            <li key={index} className='cursor-pointer hover:underline'>
                                <button onClick={() => setQuery(item)}>{item}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
```

---

## Versionamento e Updates

### Verificar Versões

```bash
npm list @ns-tech/config-eslint @ns-tech/config-prettier @ns-tech/config-tsconfig @ns-tech/react-base @ns-tech/ui
```

### Atualizar Pacotes

```bash
npm update @ns-tech/config-eslint @ns-tech/config-prettier @ns-tech/config-tsconfig @ns-tech/react-base @ns-tech/ui
```

---

## Extensões VS Code Recomendadas

Para melhorar a experiência de desenvolvimento ao usar os pacotes NS-Tech, recomendamos instalar as seguintes extensões do VS Code:

### Extensões Essenciais

#### 1. ESLint (`dbaeumer.vscode-eslint`)

**Para que serve**: Integração completa do ESLint no VS Code para detectar e corrigir problemas de código em tempo real.

**Configuração automática**: Funciona automaticamente com `@ns-tech/config-eslint`.

**Instalar via**:

-   VS Code Marketplace: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   Command Palette: `ext install dbaeumer.vscode-eslint`

**Configurações recomendadas para settings.json**:

```json
{
    "eslint.enable": true,
    "eslint.format.enable": true,
    "eslint.codeAction.showDocumentation": {
        "enable": true
    },
    "eslint.run": "onType"
}
```

#### 2. Prettier - Code formatter (`esbenp.prettier-vscode`)

**Para que serve**: Formatação automática de código usando as configurações do `@ns-tech/config-prettier`.

**Configuração automática**: Detecta automaticamente o arquivo `.prettierrc.json`.

**Instalar via**:

-   VS Code Marketplace: [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   Command Palette: `ext install esbenp.prettier-vscode`

**Configurações recomendadas para settings.json**:

```json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```

#### 3. TypeScript Importer (`pmneo.tsimporter`)

**Para que serve**: Auto-import inteligente para hooks do `@ns-tech/react-base` e outros módulos TypeScript.

**Benefício**: Facilita a importação automática de `useDebounce`, `useLocalStorage`, etc.

**Instalar via**:

-   VS Code Marketplace: [TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter)
-   Command Palette: `ext install pmneo.tsimporter`

### Configuração Completa do Workspace

Crie um arquivo `.vscode/settings.json` na raiz do seu projeto com as seguintes configurações:

```json
{
    // ESLint
    "eslint.enable": true,
    "eslint.format.enable": true,
    "eslint.codeAction.showDocumentation": {
        "enable": true
    },
    "eslint.run": "onType",

    // Prettier
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },

    // TypeScript
    "typescript.preferences.includePackageJsonAutoImports": "auto",
    "typescript.suggest.autoImports": true,
    "typescript.updateImportsOnFileMove.enabled": "always",

    // React/JSX
    "emmet.includeLanguages": {
        "javascript": "javascriptreact",
        "typescript": "typescriptreact"
    },
    "emmet.triggerExpansionOnTab": true,

    // Arquivos
    "files.autoSave": "onFocusChange",
    "files.trimTrailingWhitespace": true,
    "files.insertFinalNewline": true,

    // Editor
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
        "source.organizeImports": true
    },
    "editor.tabSize": 4,
    "editor.insertSpaces": true
}
```

### Configuração de Extensões Recomendadas

Crie um arquivo `.vscode/extensions.json` para sugerir extensões aos membros da equipe:

```json
{
    "recommendations": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "pmneo.tsimporter",
        "formulahendry.auto-rename-tag",
        "dsznajder.es7-react-js-snippets",
        "bradlc.vscode-tailwindcss",
        "ms-vscode.vscode-typescript-next"
    ]
}
```

### Comandos Úteis do VS Code

**Para usar com os pacotes NS-Tech**:

-   `Ctrl/Cmd + Shift + P` → `ESLint: Fix all auto-fixable Problems`
-   `Ctrl/Cmd + Shift + P` → `Format Document` (usa Prettier)
-   `Ctrl/Cmd + Shift + I` → Organizar imports automaticamente
-   `F2` → Renomear símbolo (útil ao refatorar hooks)

---

## Troubleshooting

### Problemas Comuns

1. **Erro de TypeScript sobre módulos não encontrados**

    - Certifique-se de ter instalado todas as dependências peer
    - Verifique se o `tsconfig.json` está estendendo corretamente a configuração base

2. **ESLint não reconhece as regras**

    - Instale `eslint-plugin-react`
    - Certifique-se de que o arquivo `.eslintrc` está na raiz do projeto

3. **Prettier não está formatando**

    - Verifique se o arquivo `.prettierrc.json` existe e está configurado corretamente
    - Instale a extensão do Prettier no seu editor

4. **Hooks não funcionando**
    - Certifique-se de que a versão do React é compatível (>= 16.8)
    - Verifique se está importando corretamente do pacote `@ns-tech/react-base`

### Suporte

Para problemas específicos ou dúvidas sobre os pacotes, consulte os CHANGELOGs individuais de cada pacote ou entre em contato com a equipe de desenvolvimento.
