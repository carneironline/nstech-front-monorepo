# @ns-tech/ui-design-system

> ⚠️ **PACOTE EM DESENVOLVIMENTO ATIVO**
>
> Este pacote está sendo desenvolvido e não está disponível para instalação externa ainda.
> A documentação abaixo serve como referência para desenvolvimento futuro.

Sistema de design moderno e componentes UI reutilizáveis para React. Fornece uma biblioteca completa de componentes com design consistente, acessibilidade e customização flexível.

## Status de Desenvolvimento

```
🚧 Em desenvolvimento ativo
📦 Não publicado no NPM
⏳ Componentes sendo implementados
📋 Documentação em preparação
```

## Recursos

-   🎨 **Design System**: Tokens de design padronizados (cores, tipografia, espaçamentos)
-   🧩 **Componentes React**: Biblioteca completa de componentes UI
-   ♿ **Acessibilidade**: Componentes com ARIA e navegação por teclado
-   🎯 **TypeScript**: Totalmente tipado com TypeScript 5.7+
-   📱 **Responsivo**: Design mobile-first e layouts adaptativos
-   🎨 **Temas**: Suporte a temas claro/escuro e customização
-   ⚡ **Performance**: Otimizado para React 19 e tree-shaking
-   📏 **Variantes**: Sistema flexível de variantes e tamanhos

## Instalação

> ⚠️ **ATENÇÃO**: Este pacote não está disponível publicamente ainda.

```bash
# APENAS para desenvolvimento no monorepo
pnpm add '@ns-tech/ui-design-system@workspace:*'

# Não disponível ainda - será disponível em breve:
# npm install @ns-tech/ui-design-system
```

## Dependências

Este pacote requer as seguintes dependências em seu projeto:

```bash
npm install react react-dom
# Para estilos (escolha uma opção)
npm install tailwindcss  # ou
npm install styled-components  # ou
npm install @emotion/react
```

## Setup Inicial

### Configuração do Tema

```typescript
import { ThemeProvider } from '@ns-tech/ui-design-system';

function App() {
    return (
        <ThemeProvider theme='light'>
            {' '}
            {/* ou "dark" */}
            <YourApp />
        </ThemeProvider>
    );
}
```

### Importação de Estilos

```css
/* src/index.css ou src/App.css */
@import '@ns-tech/ui-design-system/styles';
```

## Componentes Disponíveis

### Button

```typescript
import { Button } from '@ns-tech/ui-design-system';

function MyComponent() {
    return (
        <div>
            {/* Variantes */}
            <Button variant='primary'>Primário</Button>
            <Button variant='secondary'>Secundário</Button>
            <Button variant='danger'>Perigo</Button>
            <Button variant='ghost'>Ghost</Button>

            {/* Tamanhos */}
            <Button size='small'>Pequeno</Button>
            <Button size='medium'>Médio</Button>
            <Button size='large'>Grande</Button>

            {/* Estados */}
            <Button disabled>Desabilitado</Button>
            <Button loading>Carregando...</Button>

            {/* Com ícones */}
            <Button leftIcon={<PlusIcon />}>Adicionar</Button>
            <Button rightIcon={<ArrowIcon />}>Continuar</Button>
        </div>
    );
}
```

### Input

```typescript
import { Input, InputGroup } from '@ns-tech/ui-design-system';

function FormComponent() {
    return (
        <div>
            {/* Input básico */}
            <Input placeholder='Digite seu nome' value={name} onChange={(e) => setName(e.target.value)} />

            {/* Input com label */}
            <Input
                label='Email'
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            {/* Input com erro */}
            <Input
                label='Senha'
                type='password'
                error='Senha deve ter pelo menos 8 caracteres'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* Input group */}
            <InputGroup>
                <Input placeholder='Buscar...' />
                <Button>🔍</Button>
            </InputGroup>
        </div>
    );
}
```

### Card

```typescript
import { Card, CardHeader, CardBody, CardFooter } from '@ns-tech/ui-design-system';

function ProductCard() {
    return (
        <Card>
            <CardHeader>
                <h3>Produto Premium</h3>
                <span className='price'>R$ 99,90</span>
            </CardHeader>

            <CardBody>
                <p>Descrição do produto com todas as funcionalidades incríveis.</p>
            </CardBody>

            <CardFooter>
                <Button variant='primary' fullWidth>
                    Comprar Agora
                </Button>
            </CardFooter>
        </Card>
    );
}
```

### Modal

```typescript
import { Modal, useModal } from '@ns-tech/ui-design-system';

function MyComponent() {
    const { isOpen, open, close } = useModal();

    return (
        <div>
            <Button onClick={open}>Abrir Modal</Button>

            <Modal isOpen={isOpen} onClose={close} title='Confirmação' size='medium'>
                <p>Tem certeza que deseja continuar?</p>
                <div className='modal-actions'>
                    <Button variant='secondary' onClick={close}>
                        Cancelar
                    </Button>
                    <Button variant='primary' onClick={handleConfirm}>
                        Confirmar
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
```

### Toast/Notifications

```typescript
import { useToast } from '@ns-tech/ui-design-system';

function ActionComponent() {
    const { showToast } = useToast();

    const handleSuccess = () => {
        showToast({
            type: 'success',
            title: 'Sucesso!',
            message: 'Operação realizada com sucesso.',
            duration: 3000,
        });
    };

    const handleError = () => {
        showToast({
            type: 'error',
            title: 'Erro!',
            message: 'Algo deu errado. Tente novamente.',
            duration: 5000,
        });
    };

    return (
        <div>
            <Button onClick={handleSuccess}>Sucesso</Button>
            <Button onClick={handleError}>Erro</Button>
        </div>
    );
}
```

## Design Tokens

### Cores

```typescript
import { tokens } from '@ns-tech/ui-design-system';

const colors = {
    // Primárias
    primary: tokens.colors.blue[500],
    primaryHover: tokens.colors.blue[600],

    // Secundárias
    secondary: tokens.colors.gray[500],

    // Semânticas
    success: tokens.colors.green[500],
    warning: tokens.colors.yellow[500],
    error: tokens.colors.red[500],

    // Neutras
    text: tokens.colors.gray[900],
    textSecondary: tokens.colors.gray[600],
    background: tokens.colors.white,
    border: tokens.colors.gray[200],
};
```

### Tipografia

```typescript
const typography = {
    fontFamily: {
        sans: tokens.fonts.sans,
        mono: tokens.fonts.mono,
    },
    fontSize: {
        xs: tokens.fontSize.xs, // 12px
        sm: tokens.fontSize.sm, // 14px
        base: tokens.fontSize.base, // 16px
        lg: tokens.fontSize.lg, // 18px
        xl: tokens.fontSize.xl, // 20px
        '2xl': tokens.fontSize['2xl'], // 24px
        '3xl': tokens.fontSize['3xl'], // 30px
    },
    fontWeight: {
        normal: tokens.fontWeight.normal, // 400
        medium: tokens.fontWeight.medium, // 500
        semibold: tokens.fontWeight.semibold, // 600
        bold: tokens.fontWeight.bold, // 700
    },
};
```

### Espaçamentos

```typescript
const spacing = {
    xs: tokens.spacing.xs, // 4px
    sm: tokens.spacing.sm, // 8px
    md: tokens.spacing.md, // 16px
    lg: tokens.spacing.lg, // 24px
    xl: tokens.spacing.xl, // 32px
    '2xl': tokens.spacing['2xl'], // 48px
    '3xl': tokens.spacing['3xl'], // 64px
};
```

## Customização de Temas

### Tema Personalizado

```typescript
import { createTheme, ThemeProvider } from '@ns-tech/ui-design-system';

const customTheme = createTheme({
    colors: {
        primary: {
            50: '#eff6ff',
            500: '#3b82f6',
            900: '#1e3a8a',
        },
        secondary: {
            50: '#f9fafb',
            500: '#6b7280',
            900: '#111827',
        },
    },
    fonts: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
    },
});

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <YourApp />
        </ThemeProvider>
    );
}
```

### CSS Variables

```css
:root {
    /* Cores primárias */
    --color-primary-50: #eff6ff;
    --color-primary-500: #3b82f6;
    --color-primary-900: #1e3a8a;

    /* Tipografia */
    --font-sans: 'Inter', system-ui, sans-serif;
    --font-mono: 'Fira Code', monospace;

    /* Espaçamentos */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
}

[data-theme='dark'] {
    --color-background: #111827;
    --color-text: #f9fafb;
    --color-border: #374151;
}
```

## Componentes Customizados

### Criando um Componente

```typescript
import { forwardRef } from 'react';
import { styled } from '@ns-tech/ui-design-system';

interface BadgeProps {
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    size?: 'small' | 'medium' | 'large';
    children: React.ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ variant = 'primary', size = 'medium', children, ...props }, ref) => {
        return (
            <StyledBadge ref={ref} data-variant={variant} data-size={size} {...props}>
                {children}
            </StyledBadge>
        );
    }
);

const StyledBadge = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    font-weight: 500;

    /* Tamanhos */
    &[data-size='small'] {
        padding: 2px 8px;
        font-size: 12px;
    }

    &[data-size='medium'] {
        padding: 4px 12px;
        font-size: 14px;
    }

    &[data-size='large'] {
        padding: 6px 16px;
        font-size: 16px;
    }

    /* Variantes */
    &[data-variant='primary'] {
        background-color: var(--color-primary-100);
        color: var(--color-primary-800);
    }

    &[data-variant='success'] {
        background-color: var(--color-green-100);
        color: var(--color-green-800);
    }

    &[data-variant='error'] {
        background-color: var(--color-red-100);
        color: var(--color-red-800);
    }
`;

Badge.displayName = 'Badge';

export { Badge };
```

### Usando o Componente

```typescript
import { Badge } from './Badge';

function StatusComponent() {
    return (
        <div>
            <Badge variant='success'>Ativo</Badge>
            <Badge variant='warning'>Pendente</Badge>
            <Badge variant='error'>Inativo</Badge>
        </div>
    );
}
```

## Hooks Utilitários

### useTheme

```typescript
import { useTheme } from '@ns-tech/ui-design-system';

function ThemeToggle() {
    const { theme, setTheme, isDark } = useTheme();

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <Button onClick={toggleTheme}>
            {isDark ? '🌙' : '☀️'} {theme}
        </Button>
    );
}
```

### useBreakpoint

```typescript
import { useBreakpoint } from '@ns-tech/ui-design-system';

function ResponsiveComponent() {
    const { isMobile, isTablet, isDesktop } = useBreakpoint();

    return (
        <div>
            {isMobile && <MobileMenu />}
            {isTablet && <TabletMenu />}
            {isDesktop && <DesktopMenu />}
        </div>
    );
}
```

## Padrões de Uso

### Layout Complexo

```typescript
import { Container, Grid, GridItem, Flex, Box, Spacer } from '@ns-tech/ui-design-system';

function DashboardLayout() {
    return (
        <Container maxWidth='7xl'>
            <Grid templateColumns='1fr 3fr 1fr' gap={6}>
                <GridItem>
                    <Sidebar />
                </GridItem>

                <GridItem>
                    <Box p={6}>
                        <Flex align='center' mb={4}>
                            <h1>Dashboard</h1>
                            <Spacer />
                            <Button>Nova Ação</Button>
                        </Flex>

                        <MainContent />
                    </Box>
                </GridItem>

                <GridItem>
                    <RightPanel />
                </GridItem>
            </Grid>
        </Container>
    );
}
```

### Formulário Complexo

```typescript
import {
    Form,
    FormField,
    FormLabel,
    FormInput,
    FormSelect,
    FormTextarea,
    FormCheckbox,
    FormButton,
    FormGroup,
} from '@ns-tech/ui-design-system';

function ContactForm() {
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <FormField>
                    <FormLabel required>Nome</FormLabel>
                    <FormInput placeholder='Seu nome completo' value={name} onChange={setName} />
                </FormField>

                <FormField>
                    <FormLabel required>Email</FormLabel>
                    <FormInput type='email' placeholder='seu@email.com' value={email} onChange={setEmail} />
                </FormField>
            </FormGroup>

            <FormField>
                <FormLabel>Categoria</FormLabel>
                <FormSelect placeholder='Selecione uma categoria' value={category} onChange={setCategory}>
                    <option value='support'>Suporte</option>
                    <option value='sales'>Vendas</option>
                    <option value='feedback'>Feedback</option>
                </FormSelect>
            </FormField>

            <FormField>
                <FormLabel>Mensagem</FormLabel>
                <FormTextarea
                    placeholder='Digite sua mensagem...'
                    rows={4}
                    value={message}
                    onChange={setMessage}
                />
            </FormField>

            <FormField>
                <FormCheckbox checked={acceptTerms} onChange={setAcceptTerms}>
                    Aceito os termos e condições
                </FormCheckbox>
            </FormField>

            <FormButton type='submit' disabled={!acceptTerms}>
                Enviar Mensagem
            </FormButton>
        </Form>
    );
}
```

## Testes

### Testando Componentes

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@ns-tech/ui-design-system';

describe('Button', () => {
    it('renders with correct text', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);

        fireEvent.click(screen.getByText('Click me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when disabled prop is true', () => {
        render(<Button disabled>Click me</Button>);
        expect(screen.getByText('Click me')).toBeDisabled();
    });
});
```

### Testando com Tema

```typescript
import { render } from '@testing-library/react';
import { ThemeProvider } from '@ns-tech/ui-design-system';

function renderWithTheme(component: React.ReactElement, theme = 'light') {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
}

describe('Button with theme', () => {
    it('applies correct styles in light theme', () => {
        const { container } = renderWithTheme(<Button>Test</Button>, 'light');
        // Test light theme styles
    });

    it('applies correct styles in dark theme', () => {
        const { container } = renderWithTheme(<Button>Test</Button>, 'dark');
        // Test dark theme styles
    });
});
```

## Storybook

### Setup do Storybook

```typescript
// .storybook/main.ts
export default {
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
};
```

### Story Exemplo

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@ns-tech/ui-design-system';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'danger', 'ghost'],
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Button',
    },
};

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem' }}>
            <Button variant='primary'>Primary</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='danger'>Danger</Button>
            <Button variant='ghost'>Ghost</Button>
        </div>
    ),
};
```

## Migração

### Da versão anterior

```typescript
// ❌ Versão antiga
import { Button } from 'ui-components';

// ✅ Nova versão
import { Button } from '@ns-tech/ui-design-system';
```

## Compatibilidade

-   **React**: 18.0.0+
-   **TypeScript**: 5.0.0+
-   **Node.js**: 18.0.0+

## Roadmap

-   [ ] Componentes de Data Display (Table, List, etc.)
-   [ ] Charts e Visualizações
-   [ ] Componentes de Layout avançados
-   [ ] Animações e Transições
-   [ ] Suporte a React Native

## Contribuição

> **Nota**: Este projeto está em desenvolvimento ativo. Os componentes e APIs documentados acima são planejados mas podem não estar implementados ainda.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/new-component`)
3. Commit suas mudanças (`git commit -m 'Add new component'`)
4. Push para a branch (`git push origin feature/new-component`)
5. Abra um Pull Request

## Status de Lançamento

-   [ ] **Fase 1**: Tokens de design e sistema base
-   [ ] **Fase 2**: Componentes básicos (Button, Input, Card)
-   [ ] **Fase 3**: Componentes avançados (Modal, Toast, Form)
-   [ ] **Fase 4**: Layout e Grid system
-   [ ] **Fase 5**: Publicação no NPM

## Licença

MIT
