# API de Autenticação com JWT e Redis

API completa de autenticação desenvolvida em Node.js com Express, seguindo os princípios da Clean Architecture. Implementa registro, login, logout e autenticação via JWT com gerenciamento de sessão via Redis.

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
- **PostgreSQL** + **Sequelize**
- **Redis** (Docker)
- **JWT** (JSON Web Tokens)
- **bcryptjs** (Hash de senhas)
- **Joi** (Validação)
- **Swagger** (Documentação)

## 📋 Pré-requisitos

- Node.js (v16+)
- Docker Desktop
- PostgreSQL
- npm ou yarn

## 🔧 Instalação

### **Opção 1: Docker (Recomendado) 🐳**

1. **Clone o repositório**
```bash
git clone https://github.com/Mathyess/autenticacao_bearer_token.git
cd autenticacao_bearer_token
```

2. **Certifique-se de que o Docker Desktop está rodando**

3. **Execute o script de inicialização**

**Windows (PowerShell):**
```powershell
.\start-docker.ps1
```

**Linux/Mac:**
```bash
chmod +x start-docker.sh
./start-docker.sh
```

**Ou manualmente:**
```bash
docker-compose up --build -d
```

4. **Acesse a API**
- API: http://localhost:3000
- Documentação: http://localhost:3000/api-docs

### **Opção 2: Instalação Local**

1. **Clone o repositório**
```bash
git clone https://github.com/Mathyess/autenticacao_bearer_token.git
cd autenticacao_bearer_token
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
# Server Configuration
PORT=3000

# Database Configuration
DB_DIALECT=postgres
DATABASE_URL=postgresql://postgres:password@localhost:5432/exemplo_node

# JWT Configuration
JWT_SECRET=supersecretjwtkey123456789
JWT_EXPIRES_IN=1h

# Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=

# Environment
NODE_ENV=development
```

4. **Configure o banco de dados**
- Crie um banco PostgreSQL chamado `exemplo_node`
- Ajuste as credenciais no `.env` conforme necessário

5. **Inicie o Redis via Docker**
```bash
docker-compose -f redis.yml up -d
```

6. **Execute a aplicação**
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📚 Endpoints da API

### 1. Registro de Usuário
```http
POST /auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "123456"
}
```

**Resposta (201):**
```json
{
  "id": "uuid-do-usuario",
  "name": "João Silva",
  "email": "joao@example.com"
}
```

### 2. Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "123456"
}
```

**Resposta (200):**
```json
{
  "token": "jwt-token-aqui",
  "user": {
    "id": "uuid-do-usuario",
    "name": "João Silva",
    "email": "joao@example.com"
  }
}
```

### 3. Logout
```http
POST /auth/logout
Authorization: Bearer jwt-token-aqui
```

**Resposta (200):**
```json
{
  "message": "Logged out successfully"
}
```

### 4. Rota Protegida
```http
GET /protected
Authorization: Bearer jwt-token-aqui
```

**Resposta (200):**
```json
{
  "message": "This is a protected route",
  "user": {
    "userId": "uuid-do-usuario",
    "email": "joao@example.com"
  }
}
```

## 🔐 Autenticação

### Como usar tokens JWT:

1. **Faça login** para obter um token
2. **Inclua o token** no header `Authorization: Bearer <token>`
3. **Acesse rotas protegidas** com o token
4. **Faça logout** para invalidar o token

### Segurança:

- Tokens expiram em 1 hora (configurável)
- Logout adiciona tokens à blacklist no Redis
- Senhas são hasheadas com bcrypt
- Validação de dados com Joi
- Middleware verifica blacklist antes de validar tokens

## 📖 Documentação

Acesse a documentação interativa da API em:
```
http://localhost:3000/api-docs
```

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture**:

```
src/
├── Application/          # Casos de uso e DTOs
├── Domain/              # Entidades e regras de negócio
├── Infrastructure/      # Implementações externas
│   ├── Express/         # Controllers, middlewares, rotas
│   ├── Persistence/     # Repositórios (Sequelize, Redis)
│   └── Providers/       # JWT, etc.
└── config/              # Configurações
```

## 🧪 Testando a API

### Com curl:

```bash
# 1. Registrar usuário
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@example.com","password":"123456"}'

# 2. Fazer login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@example.com","password":"123456"}'

# 3. Acessar rota protegida (substitua TOKEN_AQUI pelo token recebido)
curl -X GET http://localhost:3000/protected \
  -H "Authorization: Bearer TOKEN_AQUI"

# 4. Fazer logout
curl -X POST http://localhost:3000/auth/logout \
  -H "Authorization: Bearer TOKEN_AQUI"
```

### Com Postman/Insomnia:

1. Importe a coleção do Swagger
2. Configure as variáveis de ambiente
3. Teste os endpoints sequencialmente

## 🐳 Docker

### **Comandos Docker**

**Iniciar todos os serviços:**
```bash
docker-compose up --build -d
```

**Ver logs em tempo real:**
```bash
docker-compose logs -f app
```

**Parar todos os serviços:**
```bash
docker-compose down
```

**Reiniciar apenas a aplicação:**
```bash
docker-compose restart app
```

**Ver status dos containers:**
```bash
docker-compose ps
```

**Acessar container da aplicação:**
```bash
docker-compose exec app sh
```

**Limpar volumes (cuidado - apaga dados):**
```bash
docker-compose down -v
```

## 📝 Scripts Disponíveis

```bash
npm start          # Inicia em produção
npm run dev        # Inicia em desenvolvimento (nodemon)
```

## 🔧 Configurações

### JWT
- **Secret**: Configurado via `JWT_SECRET`
- **Expiração**: 1 hora (configurável via `JWT_EXPIRES_IN`)

### Redis
- **URL**: `redis://localhost:6379`
- **TTL**: Tokens na blacklist expiram automaticamente

### Banco de Dados
- **Dialect**: PostgreSQL
- **Sincronização**: Automática em desenvolvimento
- **Migrações**: Use `npx sequelize-cli` para produção

## 🚨 Tratamento de Erros

A API retorna códigos de status HTTP apropriados:

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `401` - Não autorizado (token ausente/inválido)
- `403` - Token revogado
- `409` - Usuário já existe
- `500` - Erro interno

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no GitHub.