# @ns-tech/react-base

Coleção de hooks, utilitários e providers React reutilizáveis para projetos modernos. Contém abstrações comuns e padrões otimizados para React 19 com TypeScript.

## Recursos

-   🎣 **Hooks Utilitários**: useDebounce, useLocalStorage e mais
-   🔧 **Utilitários Comuns**: Helpers para desenvolvimento React
-   🎯 **Context Providers**: Abstrações para gerenciamento de estado
-   📦 **Tree-shakeable**: Imports apenas do que você precisa
-   🔒 **TypeScript**: Totalmente tipado com TypeScript 5.7+
-   ⚡ **React 19**: Otimizado para a versão mais recente do React

## Instalação

```bash
# No monorepo
pnpm add '@ns-tech/react-base@workspace:*'

# Projeto externo (quando publicado)
npm install @ns-tech/react-base
```

## Dependências

Este pacote requer as seguintes dependências em seu projeto:

```bash
npm install react react-dom
```

## Hooks Disponíveis

### useDebounce

Hook para debounce de valores, útil para otimizar performance em inputs e chamadas de API.

```typescript
import { useDebounce } from '@ns-tech/react-base';

function SearchComponent() {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            // Fazer busca apenas quando o usuário parar de digitar
            performSearch(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    return (
        <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Digite para buscar...'
        />
    );
}
```

**Parâmetros:**

-   `value: T` - O valor a ser debounced
-   `delay: number` - Delay em milissegundos (padrão: 300)

### useLocalStorage

Hook para sincronizar estado com localStorage de forma reativa.

```typescript
import { useLocalStorage } from '@ns-tech/react-base';

function UserPreferences() {
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    const [language, setLanguage] = useLocalStorage('language', 'pt-BR');

    return (
        <div>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Tema: {theme}</button>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value='pt-BR'>Português</option>
                <option value='en'>English</option>
            </select>
        </div>
    );
}
```

**Parâmetros:**

-   `key: string` - Chave no localStorage
-   `initialValue: T` - Valor inicial se não existir no localStorage

**Retorna:**

-   `[value, setValue]` - Array com valor atual e função para atualizá-lo

### Outros Hooks

```typescript
// Importar hooks individuais
import { useDebounce, useLocalStorage } from '@ns-tech/react-base';

// Ou importar todos de uma vez
import { hooks } from '@ns-tech/react-base';
const { useDebounce, useLocalStorage } = hooks;
```

## Utilitários

### Funções Utilitárias

```typescript
import { utils } from '@ns-tech/react-base';

// Exemplo de utilitários disponíveis
const { formatDate, generateId, debounce } = utils;
```

## Context e Providers

### BaseProvider

Provider base para contextos customizados:

```typescript
import { providers } from '@ns-tech/react-base';

function App() {
    return (
        <providers.BaseProvider>
            <YourApp />
        </providers.BaseProvider>
    );
}
```

## Exemplos de Uso

### Componente de Busca com Debounce

```typescript
import React, { useState, useEffect } from 'react';
import { useDebounce } from '@ns-tech/react-base';

interface SearchResult {
    id: string;
    title: string;
    description: string;
}

function SearchComponent() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        if (debouncedQuery.trim()) {
            setLoading(true);
            searchAPI(debouncedQuery)
                .then(setResults)
                .finally(() => setLoading(false));
        } else {
            setResults([]);
        }
    }, [debouncedQuery]);

    return (
        <div className='search-container'>
            <input
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Buscar...'
                className='search-input'
            />

            {loading && <div>Buscando...</div>}

            {results.length > 0 && (
                <ul className='search-results'>
                    {results.map((result) => (
                        <li key={result.id}>
                            <h3>{result.title}</h3>
                            <p>{result.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

async function searchAPI(query: string): Promise<SearchResult[]> {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    return response.json();
}
```

### Configurações Persistentes

```typescript
import React from 'react';
import { useLocalStorage } from '@ns-tech/react-base';

interface AppSettings {
    theme: 'light' | 'dark';
    language: 'pt-BR' | 'en';
    notifications: boolean;
    autoSave: boolean;
}

const defaultSettings: AppSettings = {
    theme: 'light',
    language: 'pt-BR',
    notifications: true,
    autoSave: false,
};

function SettingsPanel() {
    const [settings, setSettings] = useLocalStorage('app-settings', defaultSettings);

    const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className='settings-panel'>
            <h2>Configurações</h2>

            <div className='setting-group'>
                <label>Tema:</label>
                <select
                    value={settings.theme}
                    onChange={(e) => updateSetting('theme', e.target.value as 'light' | 'dark')}
                >
                    <option value='light'>Claro</option>
                    <option value='dark'>Escuro</option>
                </select>
            </div>

            <div className='setting-group'>
                <label>Idioma:</label>
                <select
                    value={settings.language}
                    onChange={(e) => updateSetting('language', e.target.value as 'pt-BR' | 'en')}
                >
                    <option value='pt-BR'>Português</option>
                    <option value='en'>English</option>
                </select>
            </div>

            <div className='setting-group'>
                <label>
                    <input
                        type='checkbox'
                        checked={settings.notifications}
                        onChange={(e) => updateSetting('notifications', e.target.checked)}
                    />
                    Notificações
                </label>
            </div>

            <div className='setting-group'>
                <label>
                    <input
                        type='checkbox'
                        checked={settings.autoSave}
                        onChange={(e) => updateSetting('autoSave', e.target.checked)}
                    />
                    Salvamento automático
                </label>
            </div>
        </div>
    );
}
```

### Hook Personalizado com Base

```typescript
import { useState, useEffect } from 'react';
import { useDebounce } from '@ns-tech/react-base';

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

function useFetch<T>(url: string, delay: number = 300) {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const debouncedUrl = useDebounce(url, delay);

    useEffect(() => {
        if (!debouncedUrl) return;

        setState((prev) => ({ ...prev, loading: true, error: null }));

        fetch(debouncedUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setState({ data, loading: false, error: null });
            })
            .catch((error) => {
                setState({ data: null, loading: false, error: error.message });
            });
    }, [debouncedUrl]);

    return state;
}

// Uso do hook personalizado
function UserProfile({ userId }: { userId: string }) {
    const { data: user, loading, error } = useFetch<User>(`/api/users/${userId}`);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;
    if (!user) return <div>Usuário não encontrado</div>;

    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
}
```

## Performance e Otimizações

### Tree Shaking

Importe apenas o que você precisa:

```typescript
// ✅ Tree-shakeable imports
import { useDebounce } from '@ns-tech/react-base/hooks';
import { formatDate } from '@ns-tech/react-base/utils';

// ❌ Evite imports de tudo
import * as ReactBase from '@ns-tech/react-base';
```

### Memoização

Os hooks já são otimizados, mas você pode adicionar memoização extra:

```typescript
import { useMemo } from 'react';
import { useDebounce } from '@ns-tech/react-base';

function ExpensiveComponent({ searchTerm }: { searchTerm: string }) {
    const debouncedTerm = useDebounce(searchTerm, 500);

    const expensiveValue = useMemo(() => {
        return performExpensiveCalculation(debouncedTerm);
    }, [debouncedTerm]);

    return <div>{expensiveValue}</div>;
}
```

## Testes

### Testando Hooks

```typescript
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@ns-tech/react-base';

describe('useDebounce', () => {
    it('should debounce value changes', async () => {
        const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
            initialProps: { value: 'initial', delay: 100 },
        });

        expect(result.current).toBe('initial');

        rerender({ value: 'updated', delay: 100 });
        expect(result.current).toBe('initial'); // Still initial

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 150));
        });

        expect(result.current).toBe('updated'); // Now updated
    });
});
```

### Testando localStorage

```typescript
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@ns-tech/react-base';

describe('useLocalStorage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should save and retrieve from localStorage', () => {
        const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

        expect(result.current[0]).toBe('default');

        act(() => {
            result.current[1]('new value');
        });

        expect(result.current[0]).toBe('new value');
        expect(localStorage.getItem('test-key')).toBe('"new value"');
    });
});
```

## TypeScript

### Tipos Exportados

```typescript
import type { UseDebounceReturn, UseLocalStorageReturn, StorageValue } from '@ns-tech/react-base';

// Exemplo de uso de tipos
function MyComponent(): UseDebounceReturn<string> {
    return useDebounce('test', 300);
}
```

### Configuração TypeScript

Adicione ao seu `tsconfig.json`:

```json
{
    "compilerOptions": {
        "types": ["@ns-tech/react-base"]
    }
}
```

## Migração

### Da versão anterior

```typescript
// ❌ Versão antiga
import { useDebounce } from 'react-base';

// ✅ Nova versão
import { useDebounce } from '@ns-tech/react-base';
```

## Compatibilidade

-   **React**: 18.0.0+
-   **TypeScript**: 5.0.0+
-   **Node.js**: 18.0.0+

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## Licença

MIT
