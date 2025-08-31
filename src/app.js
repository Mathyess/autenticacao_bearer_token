// src/app.js
const express = require('express');
const cors = require('cors'); // Para permitir requisições de diferentes origens
const morgan = require('morgan'); // Para logs de requisição
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
require('module-alias/register');
const fs = require('fs');

// Importações da Infraestrutura
const errorHandler = require('./Infrastructure/Express/middlewares/errorHandler');
const SequelizeUserRepository = require('./Infrastructure/Persistence/Sequelize/SequelizeUserRepository');
const RedisTokenBlacklistRepository = require('./Infrastructure/Persistence/Redis/RedisTokenBlacklistRepository');
const JWTProvider = require('./Infrastructure/Providers/JWTProvider');
const authRoutes = require('./Infrastructure/Express/routes/auth.routes');
const { authenticateToken } = require('./Infrastructure/Express/middlewares/AuthMiddleware');

// Importações dos Use Cases
const RegisterUser = require('./Application/UseCases/Auth/RegisterUser');
const LoginUser = require('./Application/UseCases/Auth/LoginUser');
const LogoutUser = require('./Application/UseCases/Auth/LogoutUser');

const app = express();

// Middlewares Globais
app.use(express.json({ limit: '10mb' })); // Habilita o parsing de JSON no corpo das requisições
app.use(cors()); // Permite requisições de outras origens (CORS)
app.use(morgan('dev')); // Loga as requisições no console

// Middleware para capturar erros de parsing JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      status: 'error',
      message: 'Invalid JSON format' 
    });
  }
  next();
});

// Injeção de Dependências - Repositórios
const userRepository = new SequelizeUserRepository();
const tokenBlacklistRepository = new RedisTokenBlacklistRepository();

// Provedores
const jwtProvider = new JWTProvider();

// Use Cases (recebem dependências de infraestrutura via construtor)
const registerUserUseCase = new RegisterUser(userRepository);
const loginUserUseCase = new LoginUser(userRepository, jwtProvider);
const logoutUserUseCase = new LogoutUser(tokenBlacklistRepository);

// Rota raiz - Redireciona para o frontend ou retorna JSON para requisições API
app.get('/', (req, res) => {
  // Se for uma requisição API (com header Accept: application/json), retorna JSON
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.json({
      message: '🚀 Authentication API is running!',
      version: '1.0.0',
      endpoints: {
        documentation: '/api-docs',
        auth: {
          register: 'POST /auth/register',
          login: 'POST /auth/login',
          logout: 'POST /auth/logout'
        },
        protected: 'GET /protected'
      },
      status: 'active'
    });
  }
  
  // Caso contrário, serve o frontend
  res.sendFile('index.html', { root: 'public' });
});

// Rotas da API
// A rota principal do Express para o nosso serviço de autenticação
app.use('/auth', authRoutes(registerUserUseCase, loginUserUseCase, logoutUserUseCase, tokenBlacklistRepository));

// Rota protegida de exemplo
app.get('/protected', authenticateToken(tokenBlacklistRepository), (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Configuração do Swagger UI
try {
  const swaggerDocument = yaml.load(fs.readFileSync('./docs/swagger.yml', 'utf8'));
  // Acessível em http://localhost:3000/api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
  console.error('Failed to load swagger.yml file:', e);
}

// Servir arquivos estáticos do frontend (após as rotas da API)
app.use(express.static('public'));

// Middleware de Tratamento de Erros
// Deve ser o último middleware a ser registrado
app.use(errorHandler);

module.exports = app;



