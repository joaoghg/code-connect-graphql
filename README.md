Projeto que desenvolvi como parte da minha jornada de estudos em GraphQL, seguindo as orientacoes do curso da Alura.

## Sobre este repositorio

Criei este projeto para praticar construcao de API GraphQL do zero, organizacao de backend com NestJS e persistencia de dados com Prisma + PostgreSQL.

Mais do que "concluir um curso", a ideia aqui foi transformar teoria em pratica e fortalecer minha base para projetos reais.

## Tecnologias que pratiquei

- Node.js
- TypeScript
- NestJS
- GraphQL (Apollo)
- Prisma ORM
- PostgreSQL
- Docker Compose

## Como executar localmente

### 1. Clone o repositorio

```bash
git clone https://github.com/seu-usuario/code-connect-graphql.git
cd code-connect-graphql
```

### 2. Configure o ambiente

Use o arquivo `.env.example` como base para criar seu `.env`.

```env
POSTGRES_USER="seu_usuario"
POSTGRES_PASSWORD="sua_senha"
POSTGRES_DB="code_connect"
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/code_connect"
```

### 3. Suba o banco com Docker

```bash
docker compose up -d
```

### 4. Instale dependencias

```bash
npm install
```

### 5. Aplique migracoes e gere o Prisma Client

```bash
npx prisma migrate deploy
npx prisma generate
```

### 6. Inicie a API

```bash
npm run start:dev
```

Endpoint GraphQL:

- `http://localhost:3000/graphql`
