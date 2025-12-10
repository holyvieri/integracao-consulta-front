# Sistema de Consultas Médicas - Frontend

Frontend para o sistema de gerenciamento de consultas médicas.

## Estrutura do Projeto

\`\`\`
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
\`\`\`

## Configuração

1. Edite o arquivo `js/config.js` para apontar para o endereço do backend:

\`\`\`javascript
API_BASE_URL: 'http://localhost:8080/api'
\`\`\`

2. Certifique-se de que o backend está configurado para aceitar requisições CORS do frontend.

## Como Executar

### Opção 1: Abrir diretamente
Abra o arquivo `index.html` no navegador.

### Opção 2: Servidor local (recomendado)
\`\`\`bash
# Com Python 3
python -m http.server 3000

# Com Node.js (npx)
npx serve .

# Com VS Code
# Instale a extensão "Live Server" e clique em "Go Live"
\`\`\`

Acesse: `http://localhost:3000`

## Funcionalidades

- **Login**: Autenticação via recepcionista (email/senha)
- **Dashboard**: Visão geral com totais
- **Pacientes**: Listagem e visualização de detalhes
- **Médicos**: Listagem e visualização de detalhes
- **Consultas**: CRUD completo com notificações via RabbitMQ

## Integração com Backend

O frontend se comunica com os seguintes endpoints:

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

## Tecnologias

- HTML5
- CSS3
- JavaScript ES6+
- Bootstrap 5.3
- Bootstrap Icons
