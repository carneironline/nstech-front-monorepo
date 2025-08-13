# Front Base Project

Bem-vindo ao seu novo app TanStack!

## 📋 Índice

- [Primeiros Passos](#primeiros-passos)
- [Build para Produção](#build-para-produção)
- [Testes](#testes)
- [Estilização](#estilização)
- [Roteamento](#roteamento)
  - [Adicionando uma Rota](#adicionando-uma-rota)
  - [Adicionando Links](#adicionando-links)
  - [Usando um Layout](#usando-um-layout)
- [Busca de Dados](#busca-de-dados)
  - [React-Query](#react-query)
- [Gerenciamento de Estado](#gerenciamento-de-estado)
- [Arquivos de Demo](#arquivos-de-demo)
- [Saiba Mais](#saiba-mais)

---

## Primeiros Passos

Para executar esta aplicação:

```bash
npm install
npm run start
```

## Build para Produção

Para fazer o build desta aplicação para produção:

```bash
npm run build
```

## Testes

Este projeto usa [Vitest](https://vitest.dev/) para testes. Você pode executar os testes com:

```bash
npm run test
```

## Estilização

Este projeto usa [Tailwind CSS](https://tailwindcss.com/) para estilização.

## Roteamento

Este projeto usa [TanStack Router](https://tanstack.com/router). A configuração inicial é um roteador baseado em arquivos. Isso significa que as rotas são gerenciadas como arquivos em `src/routes`.

### Adicionando uma Rota

Para adicionar uma nova rota à sua aplicação, apenas adicione um novo arquivo no diretório `./src/routes`.

O TanStack irá gerar automaticamente o conteúdo do arquivo de rota para você.

Agora que você tem duas rotas, pode usar um componente `Link` para navegar entre elas.

### Adicionando Links

Para usar navegação SPA (Single Page Application), você precisará importar o componente `Link` de `@tanstack/react-router`.

```tsx
import { Link } from '@tanstack/react-router'
```

Então, em qualquer lugar do seu JSX, você pode usá-lo assim:

```tsx
<Link to='/about'>Sobre</Link>
```

Isso criará um link que navegará para a rota `/about`.

Mais informações sobre o componente `Link` podem ser encontradas na [documentação do Link](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Usando um Layout

Na configuração de Roteamento Baseado em Arquivos, o layout está localizado em `src/routes/__root.tsx`. Qualquer coisa que você adicionar à rota raiz aparecerá em todas as rotas. O conteúdo da rota aparecerá no JSX onde você usar o componente `<Outlet />`.

Aqui está um exemplo de layout que inclui um cabeçalho:

```tsx
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <Link to='/'>Início</Link>
          <Link to='/about'>Sobre</Link>
        </nav>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
```

O componente `<TanStackRouterDevtools />` não é obrigatório, então você pode removê-lo se não quiser em seu layout.

Mais informações sobre layouts podem ser encontradas na [documentação de Layouts](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

## Busca de Dados

Existem várias maneiras de buscar dados em sua aplicação. Você pode usar TanStack Query para buscar dados de um servidor. Mas também pode usar a funcionalidade `loader` integrada ao TanStack Router para carregar os dados de uma rota antes dela ser renderizada.

Por exemplo:

```tsx
const peopleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/people',
  loader: async () => {
    const response = await fetch('https://swapi.dev/api/people')
    return response.json() as Promise<{
      results: {
        name: string
      }[]
    }>
  },
  component: () => {
    const data = peopleRoute.useLoaderData()
    return (
      <ul>
        {data.results.map(person => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    )
  },
})
```

Os loaders simplificam drasticamente sua lógica de busca de dados. Confira mais informações na [documentação de Loader](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

### React-Query

React-Query é uma excelente adição ou alternativa ao carregamento de rotas e integrá-lo à sua aplicação é muito fácil.

Primeiro adicione suas dependências:

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

Em seguida, precisaremos criar um query client e provider. Recomendamos colocá-los em `main.tsx`.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// ...

const queryClient = new QueryClient()

// ...

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )
}
```

Você também pode adicionar TanStack Query Devtools à rota raiz (opcional).

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition='top-right' />
      <TanStackRouterDevtools />
    </>
  ),
})
```

Agora você pode usar `useQuery` para buscar seus dados.

```tsx
import { useQuery } from '@tanstack/react-query'

import './App.css'

function App() {
  const { data } = useQuery({
    queryKey: ['people'],
    queryFn: () =>
      fetch('https://swapi.dev/api/people')
        .then(res => res.json())
        .then(data => data.results as { name: string }[]),
    initialData: [],
  })

  return (
    <div>
      <ul>
        {data.map(person => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
```

Você pode descobrir tudo o que precisa saber sobre como usar React-Query na [documentação do React-Query](https://tanstack.com/query/latest/docs/framework/react/overview).

## Gerenciamento de Estado

Outro requisito comum para aplicações React é o gerenciamento de estado. Existem muitas opções para gerenciamento de estado no React. TanStack Store fornece um ótimo ponto de partida para seu projeto.

Primeiro você precisa adicionar TanStack Store como uma dependência:

```bash
npm install @tanstack/store
```

Agora vamos criar um contador simples no arquivo `src/App.tsx` como demonstração.

```tsx
import { useStore } from '@tanstack/react-store'
import { Store } from '@tanstack/store'
import './App.css'

const countStore = new Store(0)

function App() {
  const count = useStore(countStore)
  return (
    <div>
      <button onClick={() => countStore.setState(n => n + 1)}>Incrementar - {count}</button>
    </div>
  )
}

export default App
```

Uma das muitas funcionalidades interessantes do TanStack Store é a capacidade de derivar estado de outro estado. Esse estado derivado será atualizado quando o estado base for atualizado.

Vamos verificar isso duplicando a contagem usando estado derivado.

```tsx
import { useStore } from '@tanstack/react-store'
import { Store, Derived } from '@tanstack/store'
import './App.css'

const countStore = new Store(0)

const doubledStore = new Derived({
  fn: () => countStore.state * 2,
  deps: [countStore],
})
doubledStore.mount()

function App() {
  const count = useStore(countStore)
  const doubledCount = useStore(doubledStore)

  return (
    <div>
      <button onClick={() => countStore.setState(n => n + 1)}>Incrementar - {count}</button>
      <div>Dobrado - {doubledCount}</div>
    </div>
  )
}

export default App
```

Usamos a classe `Derived` para criar uma nova store que é derivada de outra store. A classe `Derived` tem um método `mount` que iniciará a atualização da store derivada.

Uma vez que criamos a store derivada, podemos usá-la no componente `App` como faríamos com qualquer outra store usando o hook `useStore`.

Você pode descobrir tudo o que precisa saber sobre como usar TanStack Store na [documentação do TanStack Store](https://tanstack.com/store/latest).

## Arquivos de Demo

Arquivos com prefixo `demo` podem ser excluídos com segurança. Eles estão lá para fornecer um ponto de partida para você brincar com as funcionalidades que instalou.

## Saiba Mais

Você pode aprender mais sobre todas as ofertas do TanStack na [documentação do TanStack](https://tanstack.com).
