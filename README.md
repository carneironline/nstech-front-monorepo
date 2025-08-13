# NS Tech - Front Monorepo

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?logo=vite)](https://vitejs.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-10.14-orange?logo=pnpm)](https://pnpm.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

Este é um monorepo front-end desenvolvido para **criar e distribuir pacotes reutilizáveis** para aplicações React. O projeto utiliza **pnpm workspaces** para gerenciar múltiplos pacotes e aplicações em um único repositório, proporcionando um ambiente de desenvolvimento e teste integrado.

## Índice

-   [Visão Geral](#visão-geral)
-   [Estrutura do Projeto](#estrutura-do-projeto)
-   [Pacotes Disponíveis](#pacotes-disponíveis)
    -   [Configurações Compartilhadas](#configurações-compartilhadas)
    -   [Pacotes React](#pacotes-react)
-   [Aplicação de Teste (front-base-project)](#aplicação-de-teste-front-base-project)
    -   [Stack Tecnológica](#stack-tecnológica)
    -   [Hooks Disponíveis (do pacote @ns-tech/react-base)](#hooks-disponíveis-do-pacote-ns-techreact-base)
    -   [Exemplo de Uso Prático](#exemplo-de-uso-prático)
-   [Tecnologias Utilizadas](#tecnologias-utilizadas)
    -   [Gerenciamento](#gerenciamento)
    -   [Desenvolvimento](#desenvolvimento)
    -   [Testes](#testes)
-   [Como Usar](#como-usar)
    -   [Pré-requisitos](#pré-requisitos)
    -   [Instalação](#instalação)
    -   [Desenvolvimento](#desenvolvimento-1)
    -   [Build e Teste](#build-e-teste)
-   [Scripts Disponíveis](#scripts-disponíveis)
    -   [Aplicação (front-base-project)](#aplicação-front-base-project)
-   [Configuração dos Workspaces](#configuração-dos-workspaces)
    -   [Links de Workspace](#links-de-workspace)
-   [Publicação de Pacotes](#publicação-de-pacotes)
    -   [Versionamento](#versionamento)
-   [Fluxo de Trabalho](#fluxo-de-trabalho)
    -   [1. Desenvolvimento](#1-desenvolvimento)
    -   [2. Teste](#2-teste)
    -   [3. Publicação](#3-publicação)
-   [Contribuição](#contribuição)
-   [Notas de Desenvolvimento](#notas-de-desenvolvimento)
    -   [Boas Práticas](#boas-práticas)
    -   [Atualizando Pacotes](#atualizando-pacotes)
-   [Licença](#licença)

---

## Visão Geral

O monorepo foi estruturado para:

-   **Criar pacotes reutilizáveis** que podem ser publicados no NPM
-   **Testar os pacotes** em uma aplicação de exemplo antes da publicação
-   **Padronizar configurações** (ESLint, Prettier, TypeScript) entre projetos
-   **Facilitar o desenvolvimento** com ferramentas modernas
-   **Garantir qualidade** através de testes e validações automáticas

## Estrutura do Projeto

```text
front-monorepo/
├── apps/
│   └── front-base-project/          # 🧪 Aplicação para testar os pacotes
│       ├── src/
│       │   ├── components/          # Componentes React
│       │   ├── routes/              # Rotas do TanStack Router
│       │   └── integrations/        # Integrações (TanStack Query)
│       ├── .prettierrc.json         # Configuração Prettier (usa pacote)
│       ├── tsconfig.json            # Configuração TypeScript (estende pacote)
│       └── package.json
├── packages/
│   ├── config-eslint/               # 📋 Configurações ESLint compartilhadas
│   ├── config-prettier/             # 🎨 Configurações Prettier compartilhadas
│   ├── config-tsconfig/             # ⚙️ Configurações TypeScript compartilhadas
│   ├── react-base/                  # 🪝 Hooks e utilitários base para React
│   └── ui-design-system/            # 🎨 Sistema de design UI
├── package.json
├── pnpm-workspace.yaml
└── pnpm-lock.yaml
```

## Pacotes Disponíveis

### Configurações Compartilhadas

-   **`@ns-tech/config-eslint`** - Configurações padronizadas do ESLint
-   **`@ns-tech/config-prettier`** - Configurações padronizadas do Prettier
-   **`@ns-tech/config-tsconfig`** - Configurações base do TypeScript

### Pacotes React

-   **`@ns-tech/react-base`** - Hooks e utilitários base para React
-   **`@ns-tech/ui`** - Sistema de design e componentes UI

## Aplicação de Teste (front-base-project)

O **front-base-project** é uma aplicação React moderna que serve como **ambiente de teste e demonstração** para os pacotes desenvolvidos.

### Stack Tecnológica

-   **React 19** - Framework UI mais recente
-   **TypeScript 5.7** - Tipagem estática
-   **TanStack Router** - Roteamento type-safe
-   **TanStack Query** - Gerenciamento de estado servidor
-   **Tailwind CSS 4** - Framework CSS utilitário
-   **Vite 6** - Bundler e dev server ultra-rápido
-   **Vitest** - Framework de testes
-   **Prettier** - Formatação de código

### Hooks Disponíveis (do pacote @ns-tech/react-base)

```typescript
// Hook para debounce de valores
import { useDebounce } from '@ns-tech/react-base';
const debouncedValue = useDebounce(value, 500);

// Hook para localStorage
import { useLocalStorage } from '@ns-tech/react-base';
const [value, setValue] = useLocalStorage('key', defaultValue);
```

### Exemplo de Uso Prático

```tsx
// src/routes/teste.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useDebounce } from '@ns-tech/react-base';

export const Route = createFileRoute('/teste')({
    component: TesteComponent,
});

function TesteComponent() {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        if (debouncedSearch) {
            console.log('🔍 Buscando por:', debouncedSearch);
        }
    }, [debouncedSearch]);

    return (
        <div>
            <input
                type='text'
                placeholder='Digite para buscar...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='border p-2 rounded'
            />
        </div>
    );
}
```

## Tecnologias Utilizadas

### Gerenciamento

-   **Node.js** + **pnpm** - Gerenciamento de pacotes e workspaces
-   **Turbo** - Build system para monorepos
-   **Changesets** - Versionamento e changelog

### Desenvolvimento

-   **TypeScript** - Linguagem principal
-   **React 19** - Framework UI
-   **Vite 6** - Build tool e dev server
-   **Prettier** - Formatação de código
-   **ESLint** - Linting de código

### Testes

-   **Vitest** - Framework de testes
-   **Testing Library** - Testes de componentes
-   **jsdom** - Ambiente de testes

## Como Usar

### Pré-requisitos

-   Node.js (versão 18+)
-   pnpm (recomendado)

### Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd front-monorepo

# Instale as dependências
pnpm install
```

### Desenvolvimento

#### Executar a aplicação de teste

```bash
# Navegar para o diretório da aplicação
cd apps/front-base-project

# Iniciar o servidor de desenvolvimento
pnpm dev
# ou
pnpm start
```

A aplicação estará disponível em `http://localhost:3000`

#### Trabalhar com pacotes

```bash
# Instalar dependências em todos os workspaces
pnpm install

# Executar comandos em workspaces específicos
pnpm --filter @ns-tech/ui build
pnpm --filter front-base-project test

# Adicionar dependência de workspace
pnpm --filter front-base-project add '@ns-tech/react-base@workspace:*'
```

### Build e Teste

```bash
# Build da aplicação de teste
cd apps/front-base-project
pnpm build

# Executar testes
pnpm test

# Formatação de código
pnpm format

# Verificar formatação
pnpm format:check

# Preview da build
pnpm serve
```

## Scripts Disponíveis

### Aplicação (front-base-project)

-   `pnpm dev` - Inicia o servidor de desenvolvimento
-   `pnpm start` - Alias para dev
-   `pnpm build` - Gera build de produção
-   `pnpm serve` - Serve a build localmente
-   `pnpm test` - Executa os testes
-   `pnpm format` - Formata o código com Prettier
-   `pnpm format:check` - Verifica a formatação

## Configuração dos Workspaces

O projeto utiliza **pnpm workspaces** configurado no arquivo `pnpm-workspace.yaml`:

```yaml
packages:
    - 'apps/*'
    - 'packages/*'
```

### Links de Workspace

Os pacotes são linkados usando `workspace:*` para garantir que sempre usem a versão local:

```json
{
    "dependencies": {
        "@ns-tech/react-base": "workspace:*"
    },
    "devDependencies": {
        "@ns-tech/config-prettier": "workspace:*",
        "@ns-tech/config-tsconfig": "workspace:*"
    }
}
```

## Publicação de Pacotes

Todos os pacotes são configurados para publicação pública no NPM sob o escopo `@ns-tech/`:

```json
{
    "publishConfig": {
        "access": "public"
    }
}
```

### Versionamento

O projeto utiliza **Changesets** para:

-   Gerenciar versões dos pacotes
-   Gerar changelogs automáticos
-   Coordenar publicações

## Fluxo de Trabalho

### 1. Desenvolvimento

1. Desenvolva novos hooks/componentes nos pacotes
2. Teste na aplicação `front-base-project`
3. Valide com testes e formatação

### 2. Teste

```bash
# Navegar para o projeto de teste
cd apps/front-base-project

# Instalar/atualizar dependência do pacote
pnpm remove @ns-tech/react-base
pnpm add '@ns-tech/react-base@workspace:*'

# Testar a funcionalidade
pnpm dev
```

### 3. Publicação

```bash
# Gerar changeset
pnpm changeset

# Versionar pacotes
pnpm changeset version

# Publicar no NPM
pnpm changeset publish
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. **Teste suas mudanças** na aplicação `front-base-project`
4. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
5. Push para a branch (`git push origin feature/nova-feature`)
6. Abra um Pull Request

## Notas de Desenvolvimento

### Boas Práticas

-   **Sempre teste os pacotes** na aplicação `front-base-project` antes de publicar
-   **Use TypeScript** para garantir type safety
-   **Siga as configurações** de ESLint e Prettier estabelecidas
-   **Documente** novos componentes e funcionalidades
-   **Use workspace links** (`workspace:*`) para dependências internas

### Atualizando Pacotes

Quando modificar um pacote, atualize no projeto de teste:

```bash
cd apps/front-base-project
pnpm remove @ns-tech/nome-do-pacote
pnpm add '@ns-tech/nome-do-pacote@workspace:*' --save-dev
```

## Licença

Este projeto está sob licença ISC.

---

**NS Tech** - Desenvolvendo soluções front-end modernas e reutilizáveis. 🚀

> **Objetivo:** Criar um ecossistema de pacotes React testados e validados antes da publicação no NPM.
