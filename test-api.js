// test-api.js
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testando API de Autenticação...\n');

  try {
    // 1. Teste de registro
    console.log('1️⃣ Testando registro de usuário...');
    const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, {
      name: 'Teste API',
      email: 'teste@api.com',
      password: '123456'
    });
    console.log('✅ Registro bem-sucedido:', registerResponse.data);

    // 2. Teste de login
    console.log('\n2️⃣ Testando login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'teste@api.com',
      password: '123456'
    });
    console.log('✅ Login bem-sucedido');
    const token = loginResponse.data.token;

    // 3. Teste de rota protegida
    console.log('\n3️⃣ Testando rota protegida...');
    const protectedResponse = await axios.get(`${API_BASE_URL}/protected`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Rota protegida acessada:', protectedResponse.data);

    // 4. Teste de logout
    console.log('\n4️⃣ Testando logout...');
    const logoutResponse = await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Logout bem-sucedido:', logoutResponse.data);

    // 5. Teste de acesso negado após logout
    console.log('\n5️⃣ Testando acesso negado após logout...');
    try {
      await axios.get(`${API_BASE_URL}/protected`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('❌ ERRO: Token ainda válido após logout!');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Acesso corretamente negado após logout');
      } else {
        console.log('❌ Erro inesperado:', error.message);
      }
    }

    console.log('\n🎉 Todos os testes passaram! A API está funcionando corretamente.');

  } catch (error) {
    console.error('\n❌ Erro durante os testes:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

// Verificar se o servidor está rodando
async function checkServer() {
  try {
    await axios.get(`${API_BASE_URL}/api-docs`);
    console.log('✅ Servidor está rodando em', API_BASE_URL);
    return true;
  } catch (error) {
    console.error('❌ Servidor não está rodando. Execute: npm run dev');
    return false;
  }
}

async function main() {
  const serverRunning = await checkServer();
  if (serverRunning) {
    await testAPI();
  }
}

main();





