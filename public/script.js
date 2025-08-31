// Configuração da API
const API_BASE_URL = 'http://localhost:3000';

// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const dashboard = document.getElementById('dashboard');
const loading = document.getElementById('loading');
const apiResponse = document.getElementById('apiResponse');

// Estado da aplicação
let currentUser = null;
let authToken = localStorage.getItem('authToken');

// Verificar se já está logado
if (authToken) {
    showDashboard();
}

// Event Listeners
document.getElementById('loginFormElement').addEventListener('submit', handleLogin);
document.getElementById('registerFormElement').addEventListener('submit', handleRegister);

// Funções de navegação
function showLoginForm() {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    dashboard.classList.add('hidden');
}

function showRegisterForm() {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    dashboard.classList.add('hidden');
}

function showDashboard() {
    loginForm.classList.add('hidden');
    registerForm.classList.add('hidden');
    dashboard.classList.remove('hidden');
    
    if (currentUser) {
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userEmail').textContent = currentUser.email;
    }
}

// Funções de API
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Adicionar token de autenticação se existir
    if (authToken) {
        defaultOptions.headers['Authorization'] = `Bearer ${authToken}`;
    }

    const finalOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    };

    try {
        showLoading(true);
        const response = await fetch(url, finalOptions);
        
        // Verificar se a resposta é JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Server returned non-JSON response');
        }
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
        }
        
        return data;
    } catch (error) {
        // Melhorar mensagens de erro
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Não foi possível conectar com o servidor. Verifique se a API está rodando.');
        }
        throw error;
    } finally {
        showLoading(false);
    }
}

// Handlers de formulários
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        
        // Salvar token e dados do usuário
        authToken = response.token;
        currentUser = response.user;
        localStorage.setItem('authToken', authToken);
        
        showSuccessMessage('Login realizado com sucesso!');
        showDashboard();
        displayApiResponse(response);
        
    } catch (error) {
        showErrorMessage(`Erro no login: ${error.message}`);
        displayApiResponse({ error: error.message });
    }
}

async function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
        const response = await apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });
        
        showSuccessMessage('Usuário registrado com sucesso! Faça login para continuar.');
        showLoginForm();
        displayApiResponse(response);
        
        // Limpar formulário
        event.target.reset();
        
    } catch (error) {
        showErrorMessage(`Erro no registro: ${error.message}`);
        displayApiResponse({ error: error.message });
    }
}

async function logout() {
    try {
        await apiRequest('/auth/logout', {
            method: 'POST',
        });
        
        // Limpar dados locais
        authToken = null;
        currentUser = null;
        localStorage.removeItem('authToken');
        
        showSuccessMessage('Logout realizado com sucesso!');
        showLoginForm();
        displayApiResponse({ message: 'Logout realizado com sucesso' });
        
    } catch (error) {
        showErrorMessage(`Erro no logout: ${error.message}`);
        displayApiResponse({ error: error.message });
    }
}

async function testProtectedRoute() {
    try {
        const response = await apiRequest('/protected');
        showSuccessMessage('Rota protegida acessada com sucesso!');
        displayApiResponse(response);
        
    } catch (error) {
        showErrorMessage(`Erro ao acessar rota protegida: ${error.message}`);
        displayApiResponse({ error: error.message });
    }
}

// Funções de UI
function showLoading(show) {
    if (show) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}

function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    // Remover mensagens anteriores
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Criar nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Inserir no início do container
    const container = document.querySelector('.main-content');
    container.insertBefore(messageDiv, container.firstChild);
    
    // Remover após 5 segundos
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

function displayApiResponse(data) {
    const timestamp = new Date().toLocaleTimeString();
    const responseText = `[${timestamp}] ${JSON.stringify(data, null, 2)}`;
    
    // Adicionar nova resposta no topo
    const currentText = apiResponse.textContent;
    if (currentText === 'No responses yet...') {
        apiResponse.textContent = responseText;
    } else {
        apiResponse.textContent = responseText + '\n\n' + currentText;
    }
}

// Função para testar a conectividade da API
async function testApiConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/`);
        if (response.ok) {
            console.log('✅ API está funcionando corretamente');
        } else {
            console.warn('⚠️ API retornou status:', response.status);
        }
    } catch (error) {
        console.error('❌ Erro ao conectar com a API:', error.message);
        showErrorMessage('Não foi possível conectar com a API. Verifique se o servidor está rodando.');
    }
}

// Testar conexão quando a página carregar
document.addEventListener('DOMContentLoaded', testApiConnection);

// Função para limpar respostas da API
function clearApiResponses() {
    apiResponse.textContent = 'No responses yet...';
}

// Adicionar botão para limpar respostas (opcional)
const clearButton = document.createElement('button');
clearButton.textContent = 'CLEAR RESPONSES';
clearButton.className = 'btn btn-warning';
clearButton.style.width = 'auto';
clearButton.style.marginTop = '10px';
clearButton.onclick = clearApiResponses;

document.querySelector('.results-area').appendChild(clearButton);
