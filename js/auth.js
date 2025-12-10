/**
 * Autenticação
 */
const Api = require("./api") // Import Api variable
const State = require("./state") // Import State variable
const UI = require("./ui") // Import UI variable

const Auth = {
  /**
   * Realiza login
   */
  async login(email, senha) {
    try {
      const response = await Api.login(email, senha)

      State.setToken(response.token)
      State.setUser({
        id: response.id,
        nome: response.nome,
        email: response.email,
      })

      UI.showApp()
      UI.navigateTo("dashboard")
      UI.showAlert("Login realizado com sucesso!", "success")
    } catch (error) {
      UI.showAlert(error.message || "Erro ao fazer login", "danger")
      throw error
    }
  },

  /**
   * Realiza logout
   */
  logout() {
    State.clearToken()
    State.clearUser()
    UI.showLogin()
  },

  /**
   * Verifica se está autenticado
   */
  isAuthenticated() {
    return !!State.getToken()
  },

  /**
   * Inicializa autenticação
   */
  init() {
    if (this.isAuthenticated()) {
      UI.showApp()
      UI.navigateTo("dashboard")
    } else {
      UI.showLogin()
    }
  },
}
