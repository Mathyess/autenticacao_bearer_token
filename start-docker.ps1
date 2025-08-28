# Script PowerShell para iniciar a API com Docker

Write-Host "🐳 Iniciando API de Autenticação com Docker..." -ForegroundColor Green
Write-Host ""

# Verificar se o Docker está rodando
try {
    docker info | Out-Null
    Write-Host "✅ Docker está rodando" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker não está rodando. Por favor, inicie o Docker Desktop." -ForegroundColor Red
    exit 1
}

# Parar containers existentes (se houver)
Write-Host "🛑 Parando containers existentes..." -ForegroundColor Yellow
docker-compose down

# Construir e iniciar containers
Write-Host "🔨 Construindo e iniciando containers..." -ForegroundColor Yellow
docker-compose up --build -d

# Aguardar um pouco para os serviços iniciarem
Write-Host "⏳ Aguardando serviços iniciarem..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Verificar status dos containers
Write-Host "📊 Status dos containers:" -ForegroundColor Cyan
docker-compose ps

Write-Host ""
Write-Host "🎉 API iniciada com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Endpoints disponíveis:" -ForegroundColor Cyan
Write-Host "   🌐 API: http://localhost:3000" -ForegroundColor White
Write-Host "   📖 Swagger: http://localhost:3000/api-docs" -ForegroundColor White
Write-Host ""
Write-Host "🧪 Para testar a API:" -ForegroundColor Cyan
Write-Host "   node test-api.js" -ForegroundColor White
Write-Host ""
Write-Host "📝 Logs em tempo real:" -ForegroundColor Cyan
Write-Host "   docker-compose logs -f app" -ForegroundColor White
Write-Host ""
Write-Host "🛑 Para parar:" -ForegroundColor Cyan
Write-Host "   docker-compose down" -ForegroundColor White

