# 📋 Instruções de Configuração e Execução

## 🚀 Configuração Inicial

### 1. Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

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

### 2. Banco de Dados PostgreSQL
- Instale o PostgreSQL
- Crie um banco de dados chamado `exemplo_node`
- Ajuste as credenciais no `.env` conforme necessário

### 3. Redis via Docker
```bash
# Iniciar Redis
docker-compose -f redis.yml up -d

# Verificar se está rodando
docker ps

# Parar Redis (quando necessário)
docker-compose -f redis.yml down
```

## 🏃‍♂️ Executando a Aplicação

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar o Servidor
```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start
```

### 3. Verificar se está Funcionando
- Acesse: `http://localhost:3000/api-docs`
- Você deve ver a documentação Swagger da API

## 🧪 Testando a API

### Opção 1: Script Automatizado
```bash
node test-api.js
```

### Opção 2: Testes Manuais

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

## 📊 Endpoints Disponíveis

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/auth/register` | Registrar usuário | ❌ |
| POST | `/auth/login` | Fazer login | ❌ |
| POST | `/auth/logout` | Fazer logout | ✅ |
| GET | `/protected` | Rota protegida de exemplo | ✅ |
| GET | `/api-docs` | Documentação Swagger | ❌ |

## 🔧 Solução de Problemas

### Erro de Conexão com PostgreSQL
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no `.env`
- Teste a conexão: `psql -h localhost -U postgres -d exemplo_node`

### Erro de Conexão com Redis
- Verifique se o Docker está rodando
- Execute: `docker-compose -f redis.yml up -d`
- Verifique: `docker ps | grep redis`

### Erro de Porta em Uso
- Mude a porta no `.env`: `PORT=3001`
- Ou pare o processo que está usando a porta 3000

### Erro de Módulos não Encontrados
- Execute: `npm install`
- Verifique se o `node_modules` existe

## 📝 Logs e Debug

### Verificar Logs do Servidor
```bash
npm run dev
# Os logs aparecerão no terminal
```

### Verificar Logs do Redis
```bash
docker logs banco_cache_redis
```

### Verificar Logs do PostgreSQL
- Depende da sua instalação do PostgreSQL
- Geralmente em `/var/log/postgresql/`

## 🎯 Critérios de Aceite Verificados

✅ **Registro de usuário** - Endpoint POST `/auth/register` funcionando  
✅ **Login com JWT** - Endpoint POST `/auth/login` retorna token  
✅ **Logout seguro** - Endpoint POST `/auth/logout` adiciona token à blacklist  
✅ **Autenticação via Bearer Token** - Middleware protege rotas  
✅ **Blacklist no Redis** - Tokens revogados são verificados  
✅ **Documentação Swagger** - Acessível em `/api-docs`  
✅ **Validação de dados** - Schemas Joi validam entrada  
✅ **Tratamento de erros** - Middleware centralizado  
✅ **Rotas protegidas** - Exemplo em GET `/protected`  

## 🚀 Próximos Passos

1. **Teste todos os endpoints** usando o script ou manualmente
2. **Verifique a documentação** em `/api-docs`
3. **Implemente novas funcionalidades** seguindo a arquitetura existente
4. **Configure para produção** (variáveis de ambiente, logs, etc.)

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do servidor
2. Confirme as configurações no `.env`
3. Teste as conexões com PostgreSQL e Redis
4. Execute o script de teste: `node test-api.js`


