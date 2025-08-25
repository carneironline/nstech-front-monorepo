# Diretrizes de Desenvolvimento Frontend - NS Tech

> **Objetivo**: Estabelecer padrões, melhores práticas e diretrizes para desenvolvimento frontend consistente e de alta qualidade no ecossistema NS Tech.

## Índice

-   [Visão Geral](#visão-geral)
-   [Pilares de Desenvolvimento](#pilares-de-desenvolvimento)
-   [Stack Tecnológica](#stack-tecnológica)
-   [Estrutura de Projetos](#estrutura-de-projetos)
-   [Padrões de Código](#padrões-de-código)
-   [Configurações Obrigatórias](#configurações-obrigatórias)
-   [Convenções de Naming](#convenções-de-naming)
-   [Gerenciamento de Estado](#gerenciamento-de-estado)
-   [Internacionalização](#internacionalização)
-   [Performance e Otimizações](#performance-e-otimizações)
-   [Testes](#testes)
-   [Acessibilidade](#acessibilidade)
-   [Versionamento e Publicação](#versionamento-e-publicação)
-   [Ambiente de Desenvolvimento](#ambiente-de-desenvolvimento)
-   [Fluxo de Trabalho](#fluxo-de-trabalho)
-   [Documentação](#documentação)
-   [Qualidade e Code Review](#qualidade-e-code-review)

---

## Visão Geral

Este documento estabelece as diretrizes oficiais para desenvolvimento frontend na NS Tech, garantindo:

-   **Consistência** entre projetos e equipes
-   **Qualidade** através de padrões rigorosos
-   **Produtividade** com ferramentas e configurações padronizadas
-   **Manutenibilidade** a longo prazo
-   **Performance** otimizada
-   **Acessibilidade** inclusiva

### Princípios Fundamentais

1. **Type Safety First** - TypeScript em tudo
2. **Performance Oriented** - Otimizações desde o início
3. **Developer Experience** - Ferramentas que aumentam produtividade
4. **Accessibility by Design** - Acessibilidade como prioridade
5. **Testable Code** - Código testável e bem coberto
6. **Maintainable Architecture** - Estrutura sustentável

---

## Pilares de Desenvolvimento

### 1. 🎯 **Type Safety**

-   **100% TypeScript** em todos os projetos
-   **Strict Mode** habilitado sempre
-   **Interfaces explícitas** para todas as props
-   **Typed Hooks** customizados

### 2. 🚀 **Performance**

-   **Tree Shaking** configurado
-   **Code Splitting** automático
-   **Lazy Loading** para rotas e componentes
-   **Bundle Analysis** regular

### 3. 🎨 **Design System**

-   **Componentes reutilizáveis** padronizados
-   **Tokens de design** consistentes
-   **Temas** claro/escuro suportados
-   **Responsive Design** mobile-first

### 4. ♿ **Acessibilidade**

-   **ARIA** implementado corretamente
-   **Navegação por teclado** funcional
-   **Contrast Ratios** adequados
-   **Screen Readers** suportados

### 5. 🧪 **Qualidade**

-   **Testes automatizados** obrigatórios
-   **Linting** rigoroso configurado
-   **Code Formatting** automatizado
-   **Type Checking** no CI/CD

---

## Stack Tecnológica

### 🔧 **Core Technologies**

```typescript
// Linguagem Principal
TypeScript 5.7+         // Tipagem estática obrigatória

// Framework UI
React 19                 // React com novos recursos
React DOM 19            // Renderização DOM

// Build Tools
Vite 6                  // Build tool e dev server
pnpm                    // Package manager (obrigatório)
```

### 📦 **Pacotes Obrigatórios**

> **⚠️ Aviso**: O pacote `@ns-tech/ui-design-system` está atualmente **em desenvolvimento** e não deve ser usado em produção até ser oficialmente lançado.

```json
{
    "dependencies": {
        "@ns-tech/react-base": "workspace:*", // Hooks utilitários
        "@ns-tech/config-i18n": "workspace:*", // Internacionalização
        "@ns-tech/ui-design-system": "workspace:*" // Sistema de design (em desenvolvimento)
    },
    "devDependencies": {
        "@ns-tech/config-eslint": "workspace:*", // ESLint config
        "@ns-tech/config-prettier": "workspace:*", // Prettier config
        "@ns-tech/config-tsconfig": "workspace:*" // TypeScript config
    }
}
```

### 🛠 **Ferramentas de Desenvolvimento**

```typescript
// Roteamento
TanStack Router        // Roteamento type-safe obrigatório

// State Management
TanStack Query         // Server state (obrigatório)
useState/useReducer    // Local state (preferido)
Zustand               // Global state (quando necessário)

// Styling
Tailwind CSS 4        // Framework CSS principal
CSS Modules           // CSS scoped (quando necessário)

// Testing
Vitest                // Framework de testes
Testing Library       // Testes de componentes
jsdom                 // Ambiente de testes
```

---

## Estrutura de Projetos

### 📁 **Estrutura Padrão de Aplicação**

```
project-name/
├── public/
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   └── manifest.json
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── ui/              # Componentes base do design system
│   │   ├── forms/           # Componentes de formulários
│   │   └── layout/          # Componentes de layout
│   ├── routes/              # Rotas (TanStack Router)
│   │   ├── __root.tsx       # Layout raiz
│   │   ├── index.tsx        # Página inicial
│   │   └── (auth)/          # Grupos de rotas
│   ├── hooks/               # Hooks customizados
│   ├── services/            # Serviços e APIs
│   ├── types/               # Definições TypeScript
│   ├── utils/               # Utilitários gerais
│   ├── locales/             # Arquivos de tradução
│   │   ├── pt-BR/
│   │   │   └── common.json
│   │   └── en/
│   │       └── common.json
│   ├── assets/              # Recursos estáticos
│   ├── styles/              # Estilos globais
│   ├── i18n.ts              # Configuração i18n
│   ├── main.tsx             # Entry point
│   └── vite-env.d.ts        # Types do Vite
├── .eslintrc.json           # Configuração ESLint
├── .prettierrc.json         # Configuração Prettier
├── tsconfig.json            # Configuração TypeScript
├── vite.config.ts           # Configuração Vite
├── tailwind.config.ts       # Configuração Tailwind
└── package.json
```

### 📦 **Estrutura de Pacotes (Monorepo)**

```
packages/
├── config-eslint/          # Configurações ESLint
├── config-prettier/        # Configurações Prettier
├── config-tsconfig/        # Configurações TypeScript
├── config-i18n/           # Configuração i18n
├── react-base/             # Hooks e utilitários
└── ui-design-system/       # Componentes UI (em desenvolvimento)
```

---

## Padrões de Código

### 🔤 **TypeScript Strict**

```typescript
// ✅ Sempre declare interfaces explícitas
interface UserProps {
    id: string;
    name: string;
    email?: string;
    isActive: boolean;
}

// ✅ Use union types ao invés de any
type Status = 'loading' | 'success' | 'error';

// ✅ Props de componentes sempre tipadas
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
    return (
        <button
            type='button'
            className={cn(baseStyles, variantStyles[variant], sizeStyles[size])}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
```

### 🎣 **Padrões de Hooks**

```typescript
// ✅ Hooks customizados sempre começam com 'use'
export function useDebounce<T>(value: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

// ✅ Use hooks do @ns-tech/react-base
import { useLocalStorage, useDebounce } from '@ns-tech/react-base';

function UserPreferences() {
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    // ...
}
```

### 🧩 **Padrões de Componentes**

```typescript
// ✅ Componente funcional com TypeScript
interface ComponentProps {
    title: string;
    description?: string;
    onSubmit: (data: FormData) => void;
}

export function MyComponent({ title, description, onSubmit }: ComponentProps) {
    // ✅ useState tipado
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // ✅ Handlers tipados
    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            onSubmit(formData);
        },
        [onSubmit]
    );

    return (
        <div className='component-container'>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
            {/* Conteúdo do componente */}
        </div>
    );
}

// ✅ Export com memo quando necessário
export default memo(MyComponent);
```

### 🌐 **Padrões de Internacionalização**

```typescript
// ✅ Use sempre o hook de tradução
import { useTranslation } from '@ns-tech/config-i18n';

function WelcomeMessage({ username }: { username: string }) {
    const { t, i18n } = useTranslation();

    return (
        <div>
            <h1>{t('welcome.title')}</h1>
            <p>{t('welcome.greeting', { name: username })}</p>
            <button onClick={() => i18n.changeLanguage('en')}>
                {t('common.switchLanguage')}
            </button>
        </div>
    );
}

// ✅ Estrutura de tradução padronizada
// locales/pt-BR/common.json
{
    "welcome": {
        "title": "Bem-vindo ao Sistema",
        "greeting": "Olá, {{name}}!"
    },
    "common": {
        "switchLanguage": "Alterar idioma",
        "loading": "Carregando...",
        "error": "Erro ao processar solicitação"
    }
}
```

---

## Configurações Obrigatórias

### 📝 **ESLint** (.eslintrc.json)

```json
{
    "extends": ["@ns-tech/config-eslint"],
    "rules": {
        // Regras específicas do projeto (se necessário)
    },
    "overrides": [
        {
            "files": ["**/*.test.{ts,tsx}"],
            "rules": {
                "@typescript-eslint/no-explicit-any": "off"
            }
        }
    ]
}
```

### 🎨 **Prettier** (.prettierrc.json)

```json
"@ns-tech/config-prettier"
```

### 🔧 **TypeScript** (tsconfig.json)

```json
{
    "extends": "@ns-tech/config-tsconfig",
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"],
            "@/components/*": ["src/components/*"],
            "@/hooks/*": ["src/hooks/*"],
            "@/types/*": ["src/types/*"],
            "@/utils/*": ["src/utils/*"]
        }
    },
    "include": ["src", "vite.config.ts"],
    "exclude": ["node_modules", "dist"]
}
```

### ⚡ **Vite** (vite.config.ts)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
    plugins: [TanStackRouterVite({ autoCodeSplitting: true }), react(), tailwindcss()],
    test: {
        globals: true,
        environment: 'jsdom',
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
});
```

---

## Convenções de Naming

### 📁 **Arquivos e Pastas**

```
✅ Arquivos de componentes:     PascalCase.tsx
✅ Arquivos de hooks:           camelCase.ts
✅ Arquivos de utilitários:     camelCase.ts
✅ Pastas:                      kebab-case
✅ Arquivos de configuração:    kebab-case.config.ts
✅ Arquivos de teste:           Component.test.tsx
```

### 🏷 **Variáveis e Funções**

```typescript
// ✅ Variáveis e funções: camelCase
const userName = 'João';
const isLoggedIn = true;

function handleButtonClick() {}
function calculateTotalPrice() {}

// ✅ Constantes: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;

// ✅ Componentes e Interfaces: PascalCase
interface UserProfile {}
function UserDashboard() {}

// ✅ Types: PascalCase
type ApiResponse<T> = {
    data: T;
    status: number;
    message: string;
};
```

### 🧩 **Componentes**

```typescript
// ✅ Nomes descritivos e específicos
export function UserProfileCard() {} // ✅ Específico
export function ProductListItem() {} // ✅ Específico
export function NavigationMenu() {} // ✅ Específico

// ❌ Nomes genéricos demais
export function Card() {} // ❌ Muito genérico
export function Item() {} // ❌ Muito genérico
export function Component() {} // ❌ Muito genérico
```

---

## Gerenciamento de Estado

### 🎯 **Hierarquia de Estado**

1. **Props** - Para dados passados entre componentes
2. **useState** - Para estado local simples
3. **useReducer** - Para estado local complexo
4. **TanStack Query** - Para estado do servidor (obrigatório)
5. **Zustand** - Para estado global (apenas quando necessário)

### 📊 **TanStack Query (Obrigatório)**

```typescript
// ✅ Setup obrigatório
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutos
            gcTime: 1000 * 60 * 10, // 10 minutos
        },
    },
});

function App() {
    return <QueryClientProvider client={queryClient}>{/* Sua aplicação */}</QueryClientProvider>;
}

// ✅ Hook para fetching de dados
function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await fetch('/api/users');
            if (!response.ok) throw new Error('Failed to fetch users');
            return response.json();
        },
        staleTime: 1000 * 60 * 5,
    });
}

// ✅ Hook para mutations
function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userData: CreateUserData) => {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            if (!response.ok) throw new Error('Failed to create user');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}
```

### 🏪 **Estado Global (Zustand - Quando Necessário)**

```typescript
// ✅ Store tipado
interface AppState {
    theme: 'light' | 'dark';
    user: User | null;
    setTheme: (theme: 'light' | 'dark') => void;
    setUser: (user: User | null) => void;
}

const useAppStore = create<AppState>((set) => ({
    theme: 'light',
    user: null,
    setTheme: (theme) => set({ theme }),
    setUser: (user) => set({ user }),
}));

// ✅ Uso em componentes
function ThemeToggle() {
    const { theme, setTheme } = useAppStore();

    return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>;
}
```

---

## Internacionalização

### 🌐 **Configuração Obrigatória**

```typescript
// ✅ src/i18n.ts
import { initI18n } from '@ns-tech/config-i18n';
import ptBR from './locales/pt-BR/common.json';
import en from './locales/en/common.json';

export const i18nInstance = initI18n(
    {
        'pt-BR': { common: ptBR },
        en: { common: en },
    },
    'pt-BR' // idioma padrão
);

// ✅ main.tsx
import { I18nProvider } from '@ns-tech/config-i18n';
import { i18nInstance } from './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <I18nProvider i18nInstance={i18nInstance}>
            <App />
        </I18nProvider>
    </StrictMode>
);
```

### 📝 **Estrutura de Traduções**

```json
// locales/pt-BR/common.json
{
    "navigation": {
        "home": "Início",
        "about": "Sobre",
        "contact": "Contato"
    },
    "buttons": {
        "save": "Salvar",
        "cancel": "Cancelar",
        "delete": "Excluir",
        "edit": "Editar"
    },
    "messages": {
        "success": "Operação realizada com sucesso!",
        "error": "Ocorreu um erro. Tente novamente.",
        "loading": "Carregando..."
    },
    "forms": {
        "validation": {
            "required": "Este campo é obrigatório",
            "email": "E-mail inválido",
            "minLength": "Mínimo de {{count}} caracteres"
        }
    }
}
```

### 🔄 **Uso Padronizado**

```typescript
// ✅ Hook de tradução
import { useTranslation } from '@ns-tech/config-i18n';

function MyComponent() {
    const { t, i18n } = useTranslation();

    return (
        <div>
            <h1>{t('navigation.home')}</h1>
            <p>{t('messages.welcome', { name: 'João' })}</p>

            <button onClick={() => i18n.changeLanguage('en')}>English</button>
        </div>
    );
}
```

---

## Performance e Otimizações

### ⚡ **Code Splitting**

```typescript
// ✅ Lazy loading de rotas
import { lazy } from 'react';

const Dashboard = lazy(() => import('./routes/Dashboard'));
const Settings = lazy(() => import('./routes/Settings'));

// ✅ Suspense obrigatório
function App() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Router>
                <Routes>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes>
            </Router>
        </Suspense>
    );
}
```

### 🔄 **Memoization**

```typescript
// ✅ memo para componentes que recebem props complexas
const ExpensiveComponent = memo(function ExpensiveComponent({ data, onUpdate }: ExpensiveComponentProps) {
    // Componente computacionalmente caro
    return <div>{/* render complexo */}</div>;
});

// ✅ useMemo para cálculos custosos
function DataTable({ data, filters }: DataTableProps) {
    const filteredData = useMemo(() => {
        return data.filter((item) =>
            Object.entries(filters).every(([key, value]) =>
                item[key]?.toString().toLowerCase().includes(value.toLowerCase())
            )
        );
    }, [data, filters]);

    return <table>{/* render tabela */}</table>;
}

// ✅ useCallback para handlers que são props
function ParentComponent() {
    const [count, setCount] = useState(0);

    const handleIncrement = useCallback(() => {
        setCount((prev) => prev + 1);
    }, []);

    return <ChildComponent onIncrement={handleIncrement} />;
}
```

### 📦 **Bundle Optimization**

```typescript
// ✅ Tree shaking - imports específicos
import { Button } from '@ns-tech/ui-design-system'; // ✅
import { useDebounce } from '@ns-tech/react-base'; // ✅

// ❌ Evitar imports de tudo
import * as UI from '@ns-tech/ui-design-system'; // ❌
import * as ReactBase from '@ns-tech/react-base'; // ❌
```

---

## Testes

### 🧪 **Estratégia de Testes**

1. **Unit Tests** - 80% coverage mínimo
2. **Integration Tests** - Fluxos críticos
3. **E2E Tests** - Jornadas principais do usuário

### 🔬 **Testes de Componentes**

```typescript
// ✅ Testes obrigatórios para componentes
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
    it('should render with correct text', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('should call onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);

        fireEvent.click(screen.getByText('Click me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when disabled prop is true', () => {
        render(<Button disabled>Click me</Button>);
        expect(screen.getByText('Click me')).toBeDisabled();
    });

    it('should apply correct variant styles', () => {
        const { rerender } = render(<Button variant='primary'>Primary</Button>);
        expect(screen.getByText('Primary')).toHaveClass('bg-blue-500');

        rerender(<Button variant='danger'>Danger</Button>);
        expect(screen.getByText('Danger')).toHaveClass('bg-red-500');
    });
});
```

### 🎣 **Testes de Hooks**

```typescript
// ✅ Testes para hooks customizados
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@ns-tech/react-base';

describe('useDebounce', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should debounce value changes', () => {
        const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
            initialProps: { value: 'initial', delay: 500 },
        });

        expect(result.current).toBe('initial');

        rerender({ value: 'updated', delay: 500 });
        expect(result.current).toBe('initial'); // Still initial

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(result.current).toBe('updated'); // Now updated
    });
});
```

### 📊 **Configuração Vitest**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test/setup.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],
            threshold: {
                global: {
                    statements: 80,
                    branches: 80,
                    functions: 80,
                    lines: 80,
                },
            },
        },
    },
});
```

---

## Acessibilidade

### ♿ **Requisitos Obrigatórios**

1. **ARIA** labels em todos os elementos interativos
2. **Navegação por teclado** funcional
3. **Contrast ratio** mínimo de 4.5:1
4. **Screen reader** compatibilidade
5. **Focus management** adequado

### 🎯 **Implementação**

```typescript
// ✅ Button acessível
function Button({ children, onClick, disabled, ...props }: ButtonProps) {
    return (
        <button
            type='button'
            onClick={onClick}
            disabled={disabled}
            aria-disabled={disabled}
            className={cn(
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                disabled && 'opacity-50 cursor-not-allowed'
            )}
            {...props}
        >
            {children}
        </button>
    );
}

// ✅ Input acessível
function Input({ label, error, required, ...props }: InputProps) {
    const id = useId();
    const errorId = `${id}-error`;

    return (
        <div>
            <label htmlFor={id} className='block font-medium'>
                {label}
                {required && <span aria-label='obrigatório'> *</span>}
            </label>

            <input
                id={id}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
                className={cn(
                    'border rounded px-3 py-2',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500',
                    error && 'border-red-500'
                )}
                {...props}
            />

            {error && (
                <p id={errorId} role='alert' className='text-red-500 text-sm'>
                    {error}
                </p>
            )}
        </div>
    );
}

// ✅ Modal acessível
function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const titleId = useId();

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <div className='fixed inset-0 bg-black/50' aria-hidden='true' />

            <div className='fixed inset-0 flex items-center justify-center'>
                <Dialog.Panel className='bg-white rounded p-6' role='dialog' aria-labelledby={titleId}>
                    <Dialog.Title id={titleId}>{title}</Dialog.Title>

                    {children}

                    <button onClick={onClose} aria-label='Fechar modal'>
                        ×
                    </button>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
```

---

## Versionamento e Publicação

### 📋 **Changesets (Obrigatório)**

```bash
# ✅ Criar changeset para mudanças
pnpm changeset

# ✅ Versionar pacotes
pnpm changeset version

# ✅ Publicar no NPM
pnpm changeset publish
```

### 🏷 **Semantic Versioning**

```
MAJOR.MINOR.PATCH
└─── Breaking changes
     └─── New features (backward compatible)
          └─── Bug fixes
```

**Exemplos:**

-   `1.0.0` → `2.0.0` (Breaking change)
-   `1.0.0` → `1.1.0` (New feature)
-   `1.0.0` → `1.0.1` (Bug fix)

### 📝 **Commit Messages**

```bash
# ✅ Formato padronizado
feat: adiciona componente Button ao design system
fix: corrige problema de foco no modal
docs: atualiza README com exemplos de uso
style: ajusta formatação do código
refactor: reorganiza estrutura de pastas
test: adiciona testes para hook useDebounce
chore: atualiza dependências do projeto

# ✅ Com escopo
feat(ui): adiciona componente Button
fix(hooks): corrige useDebounce delay inicial
docs(readme): adiciona seção de instalação
```

---

## Ambiente de Desenvolvimento

### 💻 **Editor Obrigatório**

-   **VS Code** com extensões padronizadas

### 🔌 **Extensões Obrigatórias**

```json
// .vscode/extensions.json
{
    "recommendations": [
        "bradlc.vscode-tailwindcss", // Tailwind CSS
        "dbaeumer.vscode-eslint", // ESLint
        "esbenp.prettier-vscode", // Prettier
        "ms-vscode.vscode-typescript-next", // TypeScript
        "formulahendry.auto-rename-tag", // Auto Rename Tag
        "christian-kohler.path-intellisense", // Path Intellisense
        "ms-vscode.vscode-json" // JSON
    ]
}
```

### ⚙️ **Configuração VS Code**

```json
// .vscode/settings.json
{
    // Formatação
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true,

    // ESLint
    "eslint.enable": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit",
        "source.organizeImports": "explicit"
    },

    // TypeScript
    "typescript.preferences.includePackageJsonAutoImports": "auto",
    "typescript.suggest.autoImports": true,
    "typescript.updateImportsOnFileMove.enabled": "always",

    // Editor
    "editor.tabSize": 4,
    "editor.insertSpaces": true,
    "files.trimTrailingWhitespace": true,
    "files.insertFinalNewline": true,

    // Tailwind CSS
    "tailwindCSS.experimental.classRegex": [
        ["cn\\(([^)]*)\\)", "'([^']*)'"],
        ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
    ]
}
```

### 🐙 **Git Hooks**

```json
// package.json
{
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged",
            "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
        }
    },
    "lint-staged": {
        "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
        "*.{json,md}": ["prettier --write"]
    }
}
```

---

## Fluxo de Trabalho

### 🔄 **Development Workflow**

```bash
# 1. ✅ Setup inicial
git clone <repository>
cd project-name
pnpm install

# 2. ✅ Desenvolvimento
cd apps/front-base-project
pnpm dev

# 3. ✅ Testes
pnpm test
pnpm test:watch
pnpm test:coverage

# 4. ✅ Qualidade
pnpm lint
pnpm lint:fix
pnpm format

# 5. ✅ Build
pnpm build
pnpm type-check
```

### 📦 **Package Development**

```bash
# 1. ✅ Desenvolver no monorepo
cd packages/novo-pacote

# 2. ✅ Testar na aplicação
cd apps/front-base-project
pnpm add '../packages/novo-pacote'

# 3. ✅ Criar changeset
pnpm changeset

# 4. ✅ Versionar e publicar
pnpm changeset version
pnpm changeset publish
```

### 🚀 **Release Process**

1. **Desenvolvimento** em branches feature
2. **Code Review** obrigatório
3. **Testes** passando (CI/CD)
4. **Merge** para main
5. **Changeset** criado
6. **Release** automatico

---

## Documentação

### 📚 **README Obrigatório**

Cada projeto/pacote deve ter:

```markdown
# Nome do Projeto

Descrição breve e clara do projeto.

## Recursos

-   ✅ Recurso 1
-   ✅ Recurso 2
-   ✅ Recurso 3

## Instalação

\`\`\`bash
npm install package-name
\`\`\`

## Uso Básico

\`\`\`typescript
import { Component } from 'package-name';

function App() {
return <Component />;
}
\`\`\`

## API Reference

### Props

| Prop    | Type   | Default   | Description    |
| ------- | ------ | --------- | -------------- |
| variant | string | 'primary' | Button variant |

## Exemplos

### Exemplo 1

\`\`\`typescript
// Código de exemplo
\`\`\`

## Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## Licença

MIT
```

### 📖 **Storybook (Recomendado)**

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Button',
    },
};
```

---

## Qualidade e Code Review

### 🔍 **Checklist de Code Review**

#### ✅ **TypeScript**

-   [ ] Todas as props e funções estão tipadas
-   [ ] Não há uso de `any`
-   [ ] Interfaces estão bem definidas
-   [ ] Imports estão corretos

#### ✅ **React**

-   [ ] Componentes seguem padrões estabelecidos
-   [ ] Hooks são usados corretamente
-   [ ] Estado é gerenciado adequadamente
-   [ ] Performance é considerada (memo, useMemo, useCallback)

#### ✅ **Acessibilidade**

-   [ ] ARIA labels estão presentes
-   [ ] Navegação por teclado funciona
-   [ ] Contrastes são adequados
-   [ ] Semântica HTML está correta

#### ✅ **Performance**

-   [ ] Imports são específicos (tree shaking)
-   [ ] Componentes custosos estão memoizados
-   [ ] Lazy loading está implementado onde necessário
-   [ ] Bundle size é monitorado

#### ✅ **Testes**

-   [ ] Testes unitários estão presentes
-   [ ] Coverage mínimo de 80%
-   [ ] Casos edge estão cobertos
-   [ ] Testes são legíveis e mantíveis

#### ✅ **Documentação**

-   [ ] README está atualizado
-   [ ] Comentários no código são claros
-   [ ] Exemplos de uso estão presentes
-   [ ] API está documentada

### 🚫 **Red Flags**

```typescript
// ❌ Evitar sempre
any; // Sem tipagem
console.log(); // Logs em produção
// TODO: implementar          // TODOs não resolvidos
function Component() {} // Componentes sem tipos
const data = response.data; // Sem tratamento de erro
```

### ✅ **Best Practices**

```typescript
// ✅ Sempre seguir
interface Props {}            // Tipagem completa
const handleClick = useCallback() // Otimização
try { } catch { }            // Tratamento de erro
aria-label=""                // Acessibilidade
data-testid=""               // Testabilidade
```

---

## Conclusão

Estas diretrizes garantem:

-   **Consistência** entre projetos
-   **Qualidade** do código produzido
-   **Manutenibilidade** a longo prazo
-   **Performance** otimizada
-   **Acessibilidade** inclusiva
-   **Developer Experience** excelente

### 📞 **Contato**

Para dúvidas sobre estas diretrizes:

-   **Time Frontend NS Tech**
-   **Documentação oficial**: [NS Tech Docs](./README.md)
-   **Issues**: Abra uma issue no repositório principal

---

**NS Tech** - Desenvolvendo soluções frontend modernas e acessíveis. 🚀

> **Última atualização**: Agosto 2025
> **Versão**: 1.0.0
