# @ns-tech/config-tsconfig

Configuração base do TypeScript otimizada para projetos React modernos. Fornece um `tsconfig.json` padronizado com as melhores práticas para React 19, TypeScript 5.7+ e ferramentas modernas de build.

## Recursos

-   ✅ Configuração otimizada para React 19 + TypeScript 5.7+
-   ✅ Suporte para JSX e TSX moderno
-   ✅ Configurações para build otimizado
-   ✅ Strict mode habilitado para máxima segurança
-   ✅ Suporte para path mapping e aliases
-   ✅ Compatível com Vite, Next.js e Create React App

## Instalação

```bash
# No monorepo
pnpm add '@ns-tech/config-tsconfig@workspace:*' --save-dev

# Projeto externo (quando publicado)
npm install @ns-tech/config-tsconfig --save-dev
```

## Dependências

Este pacote requer as seguintes dependências em seu projeto:

```bash
npm install typescript --save-dev
```

## Configuração

### Uso Básico

Crie um arquivo `tsconfig.json` na raiz do seu projeto:

```json
{
    "extends": "@ns-tech/config-tsconfig"
}
```

### Com Personalizações

```json
{
    "extends": "@ns-tech/config-tsconfig",
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"],
            "@/components/*": ["src/components/*"],
            "@/utils/*": ["src/utils/*"]
        }
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist", "build"]
}
```

## Configuração Incluída

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "lib": ["ES2022", "DOM", "DOM.Iterable"],
        "allowJs": true,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "noFallthroughCasesInSwitch": true,
        "module": "ESNext",
        "moduleResolution": "bundler",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "declaration": true,
        "declarationMap": true,
        "sourceMap": true,
        "removeComments": false,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "exactOptionalPropertyTypes": true,
        "noImplicitReturns": true,
        "noUncheckedIndexedAccess": true
    }
}
```

## Configurações por Ambiente

### Para Aplicações React (Vite)

```json
{
    "extends": "@ns-tech/config-tsconfig",
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        },
        "types": ["vite/client"]
    },
    "include": ["src", "vite.config.ts"],
    "exclude": ["node_modules", "dist"]
}
```

### Para Aplicações Next.js

```json
{
    "extends": "@ns-tech/config-tsconfig",
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["./*"]
        },
        "plugins": [
            {
                "name": "next"
            }
        ]
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
}
```

### Para Bibliotecas/Pacotes

```json
{
    "extends": "@ns-tech/config-tsconfig",
    "compilerOptions": {
        "outDir": "dist",
        "rootDir": "src",
        "declaration": true,
        "declarationMap": true,
        "sourceMap": true,
        "noEmit": false,
        "emitDeclarationOnly": false
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
}
```

## Scripts Recomendados

Adicione estes scripts ao seu `package.json`:

```json
{
    "scripts": {
        "type-check": "tsc --noEmit",
        "type-check:watch": "tsc --noEmit --watch",
        "build:types": "tsc --emitDeclarationOnly",
        "clean:types": "rm -rf dist"
    }
}
```

## Path Mapping (Aliases)

Configure aliases para imports mais limpos:

```json
{
    "extends": "@ns-tech/config-tsconfig",
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"],
            "@/components/*": ["src/components/*"],
            "@/hooks/*": ["src/hooks/*"],
            "@/utils/*": ["src/utils/*"],
            "@/types/*": ["src/types/*"],
            "@/api/*": ["src/api/*"],
            "@/assets/*": ["src/assets/*"]
        }
    }
}
```

**Exemplo de uso:**

```typescript
// ❌ Imports relativos longos
import Button from '../../../components/ui/Button';
import { formatDate } from '../../../utils/date';

// ✅ Imports com aliases
import Button from '@/components/ui/Button';
import { formatDate } from '@/utils/date';
```

## Configuração para Monorepos

Para workspaces em monorepos:

```json
{
    "extends": "@ns-tech/config-tsconfig",
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@ns-tech/*": ["packages/*/src"]
        }
    },
    "references": [{ "path": "./packages/ui" }, { "path": "./packages/utils" }, { "path": "./apps/web" }]
}
```

## TypeScript Strict Mode

Esta configuração habilita todas as verificações strict do TypeScript:

```typescript
// ✅ Tipagem explícita obrigatória
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// ❌ Erro: tipos implícitos não permitidos
function greet(name) {
    return `Hello, ${name}!`;
}

// ✅ Verificação de null/undefined
function getLength(text: string | null): number {
    return text?.length ?? 0;
}

// ❌ Erro: possível null
function getLength(text: string | null): number {
    return text.length; // Error!
}
```

## Integração com Editores

### VSCode

Configure em `.vscode/settings.json`:

```json
{
    "typescript.preferences.includePackageJsonAutoImports": "auto",
    "typescript.suggest.autoImports": true,
    "typescript.updateImportsOnFileMove.enabled": "always",
    "typescript.inlayHints.parameterNames.enabled": "all",
    "typescript.inlayHints.variableTypes.enabled": true,
    "typescript.inlayHints.functionLikeReturnTypes.enabled": true
}
```

### WebStorm/IntelliJ

1. Vá para `Settings` → `Languages & Frameworks` → `TypeScript`
2. Selecione `Use TypeScript Service`
3. Configure `TypeScript Language Service` para usar a versão local

## Resolução de Problemas

### Erro: "Cannot find module"

Verifique se os paths estão configurados corretamente:

```json
{
    "compilerOptions": {
        "moduleResolution": "bundler",
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        }
    }
}
```

### Tipos não encontrados

Instale as definições de tipos necessárias:

```bash
npm install @types/react @types/react-dom @types/node --save-dev
```

### Performance lenta

Para projetos grandes, configure:

```json
{
    "compilerOptions": {
        "skipLibCheck": true,
        "incremental": true,
        "tsBuildInfoFile": ".tsbuildinfo"
    },
    "exclude": ["node_modules", "**/*.test.ts"]
}
```

## Validação de Tipos

```bash
# Verificar tipos sem compilar
npx tsc --noEmit

# Verificar com watch mode
npx tsc --noEmit --watch

# Verificar arquivo específico
npx tsc --noEmit src/components/Button.tsx
```

## Exemplo de Componente Tipado

```typescript
import React from 'react';

interface ButtonProps {
    variant: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
    variant,
    size = 'medium',
    disabled = false,
    children,
    onClick,
}: ButtonProps): JSX.Element {
    const baseClasses = 'px-4 py-2 rounded font-medium focus:outline-none';
    const variantClasses = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };
    const sizeClasses = {
        small: 'text-sm px-2 py-1',
        medium: 'text-base px-4 py-2',
        large: 'text-lg px-6 py-3',
    };

    return (
        <button
            type='button'
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
```

## Licença

MIT
