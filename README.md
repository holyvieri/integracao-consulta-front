# Sistema de Consultas Médicas - Frontend

Frontend para o sistema de gerenciamento de consultas médicas.

## Estrutura do Projeto

```
frontend-clinica/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos customizados
├── js/
│   ├── config.js       # Configurações e constantes
│   ├── utils.js        # Funções utilitárias
│   ├── api.js          # Camada de comunicação com backend
│   ├── state.js        # Gerenciamento de estado
│   ├── ui.js           # Manipulação de interface
│   ├── auth.js         # Autenticação
│   ├── app.js          # Inicialização
│   └── pages/
│       ├── dashboard.js
│       ├── pacientes.js
│       ├── medicos.js
│       └── consultas.js
└── README.md
```

## Configuração

1. Edite o arquivo `js/config.js` para apontar para o endereço do backend:

```javascript
API_BASE_URL: 'http://localhost:8080/api'
```

2. Certifique-se de que o backend está configurado para aceitar requisições CORS do frontend.

## Como Executar

### Opção 1: Abrir diretamente
Abra o arquivo `index.html` no navegador.

### Opção 2: Servidor local
```bash
# Com Python 3
python -m http.server 3000

# Com Node.js (npx)
npx serve .

# Com VS Code
# Instale a extensão "Live Server" e clique em "Go Live"
```

Acesse: `http://localhost:3000`

## Funcionalidades

- **Login**: Autenticação via recepcionista (email/senha)
- **Dashboard**: Visão geral com totais
- **Pacientes**: Listagem e visualização de detalhes
- **Médicos**: Listagem e visualização de detalhes
- **Consultas**: CRUD completo com notificações via RabbitMQ

## Integração com Backend

O frontend se comunica com os seguintes endpoints:
```
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /recepcionista/login | Login |
| GET | /paciente | Listar pacientes |
| GET | /paciente/{id} | Detalhes do paciente |
| GET | /medico | Listar médicos |
| GET | /medico/{id} | Detalhes do médico |
| GET | /consulta | Listar consultas |
| POST | /consulta | Criar consulta |
| PUT | /consulta/{id} | Atualizar consulta |
| DELETE | /consulta/{id} | Cancelar consulta (notifica via RabbitMQ) |
```
## Tecnologias

- HTML5
- CSS3
- JavaScript ES6+
- Bootstrap 5.3
- Bootstrap Icons

## Docker

### Executar apenas o frontend

```bash
# Build da imagem
docker build -t clinica-frontend .

# Rodar o container
docker run -p 3000:80 clinica-frontend
```

Ou usando docker-compose:

```bash
docker-compose up -d
```

### Integrar com o backend

Adicione o serviço do frontend no `docker-compose.yml` do backend:

```yaml
version: '3.8'

services:
  rabbitmq:
    # ... configuração existente ...

  consultas-ms:
    # ... configuração existente ...

  # Adicionar este serviço
  frontend:
    container_name: ${PROJECT_NAME:-ms-base}-frontend
    build:
      context: ../frontend-clinica  # Caminho relativo para o repo do frontend
      dockerfile: Dockerfile
    image: ${DOCKER_IMAGE_NAME:-clinica-frontend}:${DOCKER_IMAGE_TAG:-latest}
    ports:
      - "${FRONTEND_PORT:-3000}:80"
    depends_on:
      - consultas-ms
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### Variáveis de ambiente (opcional)
```
| Variável | Padrão | Descrição |
|----------|--------|-----------|
| PROJECT_NAME | ms-base | Prefixo dos containers |
| FRONTEND_PORT | 3000 | Porta do frontend |
| DOCKER_IMAGE_NAME | clinica-frontend | Nome da imagem |
| DOCKER_IMAGE_TAG | latest | Tag da imagem |
```