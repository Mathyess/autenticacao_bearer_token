#!/bin/bash

echo "🐳 Iniciando API de Autenticação com Docker..."
echo ""

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker Desktop."
    exit 1
fi

echo "✅ Docker está rodando"

# Parar containers existentes (se houver)
echo "🛑 Parando containers existentes..."
docker-compose down

# Construir e iniciar containers
echo "🔨 Construindo e iniciando containers..."
docker-compose up --build -d

# Aguardar um pouco para os serviços iniciarem
echo "⏳ Aguardando serviços iniciarem..."
sleep 10

# Verificar status dos containers
echo "📊 Status dos containers:"
docker-compose ps

echo ""
echo "🎉 API iniciada com sucesso!"
echo ""
echo "📚 Endpoints disponíveis:"
echo "   🌐 API: http://localhost:3000"
echo "   📖 Swagger: http://localhost:3000/api-docs"
echo ""
echo "🧪 Para testar a API:"
echo "   node test-api.js"
echo ""
echo "📝 Logs em tempo real:"
echo "   docker-compose logs -f app"
echo ""
echo "🛑 Para parar:"
echo "   docker-compose down"

