# Sistema de Autenticação com Bearer Token

Sistema de autenticação completo implementado em Node.js com arquitetura limpa (Clean Architecture).

## 🏗️ Arquitetura

- **Domain**: Entidades, Value Objects e Exceções
- **Application**: Use Cases e DTOs
- **Infrastructure**: Express, Sequelize, Redis e JWT

## 🚀 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd autenticacao_bearer_token
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Configure o banco de dados**
- PostgreSQL deve estar rodando
- Crie o banco de dados `exemplo_node`

5. **Configure o Redis**
```bash
docker-compose -f redis.yml up -d
```

## 🗄️ Banco de Dados

### Desenvolvimento
```bash
npm start
# As tabelas serão criadas automaticamente
```

### Produção
```bash
npx sequelize-cli db:migrate --migrations-path src/migrations
```

## 🚀 Executando a aplicação

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📚 API Endpoints

- **POST** `/auth/register` - Registrar usuário
- **POST** `/auth/login` - Fazer login
- **GET** `/api-docs` - Documentação Swagger

## 🔧 Tecnologias

- Node.js
- Express.js
- Sequelize (PostgreSQL)
- Redis
- JWT
- bcryptjs
- Joi (Validação)
- Swagger UI

## 📁 Estrutura do Projeto

```
src/
├── Application/
│   ├── DTOS/
│   └── UseCases/
├── Domain/
│   ├── Exceptions/
│   ├── Repositories/
│   └── User/
├── Infrastructure/
│   ├── Express/
│   ├── Persistence/
│   └── Providers/
└── config/
```

## 🔐 Autenticação

O sistema usa JWT (JSON Web Tokens) para autenticação. Inclua o token no header:

```
Authorization: Bearer <seu-token>
```