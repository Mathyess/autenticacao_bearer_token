# 🔐 API de Autenticação com JWT e Redis

API completa de autenticação desenvolvida em Node.js com Express, seguindo os princípios da **Clean Architecture**. Implementa registro, login, logout e autenticação via JWT com gerenciamento de sessão via Redis.

## 🚀 Funcionalidades

- ✅ **Registro de usuários** - POST `/auth/register`
- ✅ **Login com JWT** - POST `/auth/login`
- ✅ **Logout seguro** - POST `/auth/logout`
- ✅ **Autenticação via Bearer Token** - Middleware de proteção
- ✅ **Blacklist de tokens** - Gerenciamento via Redis
- ✅ **Rotas protegidas** - Exemplo em GET `/protected`
- ✅ **Documentação Swagger** - Acessível em `/api-docs`
- ✅ **Validação de dados** - Schemas Joi
- ✅ **Tratamento de erros** - Middleware centralizado

## 🛠️ Tecnologias

- **Node.js** + **Express**
- **SQLite** + **Sequelize** (Desenvolvimento)
- **PostgreSQL** + **Sequelize** (Produção)
- **Redis** (Docker)
- **JWT** (JSON Web Tokens)
- **bcryptjs** (Hash de senhas)
- **Joi** (Validação)
- **Swagger** (Documentação)

## 📋 Pré-requisitos

- Node.js (v16+)
- Docker Desktop (para Redis)
- npm ou yarn

## 🔧 Instalação

### **1. Clone o repositório**
```bash
git clone https://github.com/Mathyess/autenticacao_bearer_token.git
cd autenticacao_bearer_token
```

### **2. Instale as dependências**
```bash
npm install
```

### **3. Configure as variáveis de ambiente**
O arquivo `.env` será criado automaticamente com as configurações padrão:
- SQLite para desenvolvimento
- Redis via Docker
- JWT configurado

### **4. Inicie o Redis**
```bash
docker-compose -f redis.yml up -d
```

### **5. Execute a aplicação**
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

### **6. Acesse a API**
- 🌐 **API Base URL**: http://localhost:3000
- 📖 **Documentação Swagger**: http://localhost:3000/api-docs

## 📚 API Endpoints

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/auth/register` | Registrar usuário | ❌ |
| POST | `/auth/login` | Fazer login | ❌ |
| POST | `/auth/logout` | Fazer logout | ✅ |
| GET | `/protected` | Rota protegida de exemplo | ✅ |
| GET | `/api-docs` | Documentação Swagger | ❌ |

## 🧪 Testando a API

### **Script Automatizado**
```bash
node test-api.js
```

### **Testes Manuais**

#### 1. Registrar Usuário
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "123456"
  }'
```

#### 2. Fazer Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "123456"
  }'
```

#### 3. Acessar Rota Protegida
```bash
# Substitua TOKEN_AQUI pelo token recebido no login
curl -X GET http://localhost:3000/protected \
  -H "Authorization: Bearer TOKEN_AQUI"
```

#### 4. Fazer Logout
```bash
curl -X POST http://localhost:3000/auth/logout \
  -H "Authorization: Bearer TOKEN_AQUI"
```

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture**:

```
src/
├── Application/          # Casos de uso e DTOs
│   ├── DTOS/
│   └── UseCases/
├── Domain/              # Entidades e regras de negócio
│   ├── Exceptions/
│   ├── Repositories/
│   └── User/
├── Infrastructure/      # Implementações externas
│   ├── Express/
│   ├── Persistence/
│   └── Providers/
└── config/             # Configurações
```

## 🔐 Autenticação

O sistema usa JWT (JSON Web Tokens) para autenticação. Inclua o token no header:

```
Authorization: Bearer <seu-token>
```

## 🗄️ Banco de Dados

### **Desenvolvimento**
- **SQLite**: Arquivo local `database.sqlite`
- **Redis**: Container Docker para cache e blacklist

### **Produção**
- **PostgreSQL**: Banco de dados principal
- **Redis**: Cache e gerenciamento de sessão

## 🚀 Deploy

### **Variáveis de Ambiente para Produção**
```env
NODE_ENV=production
DB_DIALECT=postgres
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=1h
REDIS_URL=redis://host:6379
```

## 📝 Logs

### **Verificar Status do Redis**
```bash
docker-compose -f redis.yml ps
docker-compose -f redis.yml logs
```

### **Parar Redis**
```bash
docker-compose -f redis.yml down
```

## 🎯 Critérios de Aceite

✅ **Registro de usuário** - Endpoint POST `/auth/register` funcionando  
✅ **Login com JWT** - Endpoint POST `/auth/login` retorna token  
✅ **Logout seguro** - Endpoint POST `/auth/logout` adiciona token à blacklist  
✅ **Autenticação via Bearer Token** - Middleware protege rotas  
✅ **Blacklist no Redis** - Tokens revogados são verificados  
✅ **Documentação Swagger** - Acessível em `/api-docs`  
✅ **Validação de dados** - Schemas Joi validam entrada  
✅ **Tratamento de erros** - Middleware centralizado  
✅ **Rotas protegidas** - Exemplo em GET `/protected`  

## 📞 Suporte

Se encontrar problemas:
1. Verifique se o Docker está rodando
2. Confirme se o Redis está ativo: `docker ps`
3. Verifique os logs do servidor
4. Execute o script de teste: `node test-api.js`

## 📄 Licença

Este projeto está sob a licença ISC.