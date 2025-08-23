# @nstech/i18n

Pacote de internacionalização reutilizável para aplicações React baseado no i18next. Fornece uma API simplificada para configurar e usar internacionalização em qualquer aplicação React do monorepo.

## Recursos

-   ✅ Configuração simplificada do i18next
-   ✅ Provider React para contexto de i18n
-   ✅ Exporta todos os hooks do react-i18next
-   ✅ Suporte TypeScript completo
-   ✅ Configuração flexível de idiomas e recursos

## Instalação

```bash
# No monorepo
pnpm add '@nstech/i18n@workspace:*' --save-dev

# Projeto externo (quando publicado)
npm install @nstech/i18n
```

## Dependências

Este pacote requer as seguintes dependências em seu projeto:

```bash
npm install i18next react-i18next
```

## Uso Básico

### 1. Configurar a instância i18n

```typescript
// src/i18n.ts
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

### 2. Configurar o Provider

```tsx
// src/main.tsx
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

### 3. Usar traduções nos componentes

```tsx
// src/components/MyComponent.tsx
import { useTranslation } from '@nstech/i18n';

export function MyComponent() {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'pt-BR' : 'en');
    };

    return (
        <div>
            <h1>{t('welcome')}</h1>
            <p>{t('greeting', { name: 'João' })}</p>
            <button onClick={handleLanguageChange}>{t('button_switch_language')}</button>
        </div>
    );
}
```

### 4. Estrutura de arquivos de tradução

```
src/
├── locales/
│   ├── pt-BR/
│   │   └── common.json
│   └── en/
│       └── common.json
└── i18n.ts
```

**Exemplo de arquivo de tradução:**

```json
// src/locales/pt-BR/common.json
  "greeting": "Olá, {{name}}!",
  "welcome": "Bem-vindo ao dashboard",
  "learn": "Aprenda",
  "button_switch_language": "Mudar idioma"
```

```json
// src/locales/en/common.json
{
    "welcome": "Welcome to the dashboard",
    "greeting": "Hello, {{name}}!",
    "learn": "Learn",
    "button_switch_language": "Switch language"
}
```

## API

### `initI18n(resources, defaultLng?)`

Inicializa e configura uma instância do i18next.

**Parâmetros:**

-   `resources` - Objeto contendo os recursos de tradução organizados por idioma
-   `defaultLng` - Idioma padrão (opcional, padrão: 'pt')

**Retorna:** Instância configurada do i18next

### `I18nProvider`

Componente Provider React que fornece o contexto de i18n para a aplicação.

**Props:**

-   `children` - Componentes filhos
-   `i18nInstance` - Instância do i18next configurada

### Hooks exportados

O pacote exporta todos os hooks do `react-i18next`:

-   `useTranslation()` - Hook principal para traduções
-   `useSSR()` - Para renderização server-side
-   `useSuspense()` - Para uso com React Suspense
-   E outros...

## Configuração Avançada

### Múltiplos namespaces

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

### Uso com namespace específico

```tsx
const { t } = useTranslation('errors');
const errorMessage = t('invalidCredentials');
```

## Exemplos de Componentes

### Botão para trocar idioma

```tsx
import { useTranslation } from '@nstech/i18n';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'pt-BR' : 'en';
        i18n.changeLanguage(newLang);
    };

    return <button onClick={toggleLanguage}>{i18n.language === 'en' ? '🇧🇷 PT' : '🇺🇸 EN'}</button>;
}
```

### Componente com interpolação

```tsx
import { useTranslation } from '@nstech/i18n';

export function UserGreeting({ userName }: { userName: string }) {
    const { t } = useTranslation();

    return (
        <div>
            <h2>{t('userWelcome', { name: userName })}</h2>
            <p>{t('lastLoginTime', { time: new Date().toLocaleString() })}</p>
        </div>
    );
}
```

## Notas de Desenvolvimento

-   O pacote é uma abstração simplificada sobre o i18next
-   Mantém toda a flexibilidade do i18next original
-   Facilita a configuração inicial para novos projetos
-   Suporte completo ao TypeScript

## Dependências

-   `i18next` ^23.4.0
-   `react-i18next` ^13.2.1
-   `react` ^19

## Licença

MIT
