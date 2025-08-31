// test-login.js
const axios = require('axios');

const API_BASE = 'http://localhost:3000';

async function testLogin() {
  try {
    console.log('🧪 Testando login...\n');
    
    // 1. Primeiro, vamos tentar registrar um usuário
    console.log('1️⃣ Registrando usuário de teste...');
    const registerResponse = await axios.post(`${API_BASE}/auth/register`, {
      name: 'Usuário Teste',
      email: 'teste@example.com',
      password: '123456'
    });
    
    console.log('✅ Usuário registrado:', registerResponse.data);
    
    // 2. Agora vamos tentar fazer login
    console.log('\n2️⃣ Fazendo login...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'teste@example.com',
      password: '123456'
    });
    
    console.log('✅ Login realizado com sucesso:', {
      token: loginResponse.data.token ? 'Token gerado ✓' : '❌ Sem token',
      user: loginResponse.data.user
    });
    
    // 3. Testar rota protegida
    if (loginResponse.data.token) {
      console.log('\n3️⃣ Testando rota protegida...');
      const protectedResponse = await axios.get(`${API_BASE}/protected`, {
        headers: {
          'Authorization': `Bearer ${loginResponse.data.token}`
        }
      });
      
      console.log('✅ Rota protegida acessada:', protectedResponse.data);
    }
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.response?.data || error.message);
    
    if (error.response?.status === 409) {
      console.log('\n🔄 Usuário já existe, tentando fazer login...');
      
      try {
        const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
          email: 'teste@example.com',
          password: '123456'
        });
        
        console.log('✅ Login realizado com sucesso:', {
          token: loginResponse.data.token ? 'Token gerado ✓' : '❌ Sem token',
          user: loginResponse.data.user
        });
        
      } catch (loginError) {
        console.error('❌ Erro no login:', loginError.response?.data || loginError.message);
      }
    }
  }
}

testLogin();

