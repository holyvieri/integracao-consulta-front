/**
 * Camada de Comunicação com API
 */
const Api = {
  /**
   * Requisição base com headers de autenticação
   */
  async request(endpoint, options = {}) {
    const token = window.State.getToken() // Assuming State is a global object or imported from another module

    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    }

    const response = await fetch(`${window.CONFIG.API_BASE_URL}${endpoint}`, config) // Assuming CONFIG is a global object or imported from another module

    if (response.status === 401) {
      window.Auth.logout() // Assuming Auth is a global object or imported from another module
      throw new Error("Sessão expirada. Faça login novamente.")
    }

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || `Erro ${response.status}`)
    }

    const text = await response.text()
    return text ? JSON.parse(text) : null
  },

  // Auth
  async login(email, senha) {
    return this.request("/recepcionista/login", {
      method: "POST",
      body: JSON.stringify({ email, senha }),
    })
  },

  // Pacientes
  async getPacientes() {
    return this.request("/paciente")
  },

  async getPaciente(id) {
    return this.request(`/paciente/${id}`)
  },

  // Médicos
  async getMedicos() {
    return this.request("/medico")
  },

  async getMedico(id) {
    return this.request(`/medico/${id}`)
  },

  // Consultas
  async getConsultas() {
    return this.request("/consulta")
  },

  async getConsulta(id) {
    return this.request(`/consulta/${id}`)
  },

  async createConsulta(data) {
    return this.request("/consulta", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  async updateConsulta(id, data) {
    return this.request(`/consulta/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  async deleteConsulta(id) {
    return this.request(`/consulta/${id}`, {
      method: "DELETE",
    })
  },
}

// Assuming State, CONFIG, and Auth are imported or declared elsewhere in the codebase
window.State = {
  getToken: () => "your_token_here",
}

window.CONFIG = {
  API_BASE_URL: "https://api.example.com",
}

window.Auth = {
  logout: () => console.log("Logged out"),
}
