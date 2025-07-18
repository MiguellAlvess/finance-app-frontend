# FinanceApp

Aplicação web desenvolvida para o controle de finanças pessoais. Ela permite o gerenciamento de ganhos, gastos e investimentos, além do cálculo de saldo e organização financeira dos usuários.

## Tecnologias

- **React**
- **TailwindCSS**
- **Shadcn**
- **React Query**
- **React Hook Form + Zod**
- **Axios**
- **React Router**
- **Context API**
- **ESLint & Prettier**
- **Husky & lint-staged**

## Rodando o projeto

```bash
# Instale as dependências
npm install

# Inicie o projeto
npm run dev
```

## Autenticação

A autenticação no frontend é gerenciada por um **AuthContext** personalizado, que fornece controle global sobre o estado do usuário e os fluxos de login, cadastro e logout. O mecanismo é baseado em **JWT (JSON Web Tokens)**, utilizando Access Token e Refresh Token, ambos armazenados no localStorage. Ao iniciar a aplicação, o contexto verifica automaticamente se há tokens válidos e, em caso positivo, realiza a recuperação dos dados do usuário autenticado por meio do endpoint /me. Durante o processo de login e logout, os tokens são definidos ou removidos conforme necessário.

## Service Layer

As camadas de serviço (Service Layers) foram implementadas para centralizar e organizar as chamadas HTTP feitas pela aplicação ao backend. Cada entidade (como User e Transaction) possui sua própria service layer dedicada, responsável por encapsular as interações com os respectivos endpoints da API.

Essa abordagem promove uma separação clara de responsabilidades, melhora a legibilidade e facilita a manutenção do código, uma vez que os componentes de interface lidam apenas com as funções de alto nível, sem se preocupar com detalhes de requisição.

## Inteface da aplicação

A interface do FinanceApp foi construída com TailwindCSS para estilização e Lucide Icons para elementos visuais, enquanto Shadcn serviu como base para componentes UI (como formulários e tabelas), que foram customizados para atender às necessidades do projeto. O dashboard combina um design limpo com funcionalidades claras: saldo em destaque, gráficos simplificados e listagem de transações categorizadas.

<img src="https://github.com/user-attachments/assets/408e40d1-9829-4c07-99fb-7ee45ecfdafa" />

<img  src="https://github.com/user-attachments/assets/fe2fe0cf-081a-4638-83b3-d95ffbf4173c" />

<img src="https://github.com/user-attachments/assets/23288b83-7aed-4822-b132-c8b8cab0fad2" />

<img src="https://github.com/user-attachments/assets/89c81047-8267-478b-b752-536bd02276c2" />

<img src="https://github.com/user-attachments/assets/d2e4fed9-1ef4-4f56-8869-7be3030ec84e" />

## Projeto ainda em andamento...
