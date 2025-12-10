/**
 * Manipulação de Interface
 */
const UI = {
  elements: {},
  Utils: {}, // Declare Utils variable
  State: {}, // Declare State variable
  DashboardPage: {}, // Declare DashboardPage variable
  PacientesPage: {}, // Declare PacientesPage variable
  MedicosPage: {}, // Declare MedicosPage variable
  ConsultasPage: {}, // Declare ConsultasPage variable
  bootstrap: {}, // Declare bootstrap variable
}

/**
 * Inicializa referências aos elementos DOM
 */
UI.init = function () {
  this.elements = {
    loginSection: document.getElementById("login-section"),
    appSection: document.getElementById("app-section"),
    alertContainer: document.getElementById("alert-container"),
    userInfo: document.getElementById("user-info"),
  }
}

/**
 * Exibe mensagem de alerta
 */
UI.showAlert = function (message, type = "info") {
  const alertId = this.Utils.generateId()
  const alertHtml = `
        <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${this.Utils.escapeHtml(message)}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `
  this.elements.alertContainer.insertAdjacentHTML("beforeend", alertHtml)

  setTimeout(() => {
    const alert = document.getElementById(alertId)
    if (alert) alert.remove()
  }, 5000)
}

/**
 * Mostra seção de login
 */
UI.showLogin = function () {
  this.elements.loginSection.classList.remove("d-none")
  this.elements.appSection.classList.add("d-none")
}

/**
 * Mostra seção do app
 */
UI.showApp = function () {
  this.elements.loginSection.classList.add("d-none")
  this.elements.appSection.classList.remove("d-none")

  const user = this.State.getUser()
  if (user) {
    this.elements.userInfo.textContent = user.nome || user.email
  }
}

/**
 * Navega para uma página
 */
UI.navigateTo = function (pageName) {
  // Esconde todas as páginas
  document.querySelectorAll(".page-content").forEach((page) => {
    page.classList.add("d-none")
  })

  // Mostra página solicitada
  const targetPage = document.getElementById(`page-${pageName}`)
  if (targetPage) {
    targetPage.classList.remove("d-none")
  }

  // Atualiza nav active
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.dataset.page === pageName) {
      link.classList.add("active")
    }
  })

  // Carrega dados da página
  this.loadPageData(pageName)
}

/**
 * Carrega dados específicos da página
 */
UI.loadPageData = function (pageName) {
  switch (pageName) {
    case "dashboard":
      this.DashboardPage.load()
      break
    case "pacientes":
      this.PacientesPage.load()
      break
    case "medicos":
      this.MedicosPage.load()
      break
    case "consultas":
      this.ConsultasPage.load()
      break
  }
}

/**
 * Abre modal
 */
UI.openModal = function (modalId) {
  const modal = new this.bootstrap.Modal(document.getElementById(modalId))
  modal.show()
  return modal
}

/**
 * Fecha modal
 */
UI.closeModal = function (modalId) {
  const modalEl = document.getElementById(modalId)
  const modal = this.bootstrap.Modal.getInstance(modalEl)
  if (modal) modal.hide()
}
