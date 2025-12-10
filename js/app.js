/**
 * Inicialização da Aplicação
 */
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa UI
  const UI = {} // Declare UI variable
  UI.init = () => {
    console.log("UI initialized")
  }

  // Inicializa autenticação
  const Auth = {} // Declare Auth variable
  Auth.init = () => {
    console.log("Auth initialized")
  }
  Auth.login = async (email, senha) => {
    console.log("Logging in with email:", email, "and password:", senha)
  }
  Auth.logout = () => {
    console.log("Logging out")
  }

  // Event Listeners
  setupEventListeners()
})

function setupEventListeners() {
  // Login form
  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = document.getElementById("login-email").value
    const senha = document.getElementById("login-senha").value
    await Auth.login(email, senha)
  })

  // Logout
  document.getElementById("btn-logout").addEventListener("click", () => {
    Auth.logout()
  })

  // Navigation
  document.querySelectorAll("[data-page]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const UI = {} // Declare UI variable
      UI.navigateTo = (page) => {
        console.log("Navigating to page:", page)
      }
      UI.navigateTo(link.dataset.page)
    })
  })

  // Nova consulta
  document.getElementById("btn-nova-consulta").addEventListener("click", () => {
    const ConsultasPage = {} // Declare ConsultasPage variable
    ConsultasPage.openNew = () => {
      console.log("Opening new consulta")
    }
    ConsultasPage.openNew()
  })

  // Form consulta
  document.getElementById("form-consulta").addEventListener("submit", (e) => {
    e.preventDefault()
    const ConsultasPage = {} // Declare ConsultasPage variable
    ConsultasPage.save = () => {
      console.log("Saving consulta")
    }
    ConsultasPage.save()
  })

  // Add material
  document.getElementById("btn-add-material").addEventListener("click", () => {
    const ConsultasPage = {} // Declare ConsultasPage variable
    ConsultasPage.addMaterial = () => {
      console.log("Adding material")
    }
    ConsultasPage.addMaterial()
  })

  // Enter para adicionar material
  document.getElementById("novo-material").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const ConsultasPage = {} // Declare ConsultasPage variable
      ConsultasPage.addMaterial = () => {
        console.log("Adding material")
      }
      ConsultasPage.addMaterial()
    }
  })

  // Confirm action
  document.getElementById("btn-confirm-action").addEventListener("click", () => {
    const ConsultasPage = {} // Declare ConsultasPage variable
    ConsultasPage.confirmCallback = () => {
      console.log("Confirming action")
    }
    if (ConsultasPage.confirmCallback) {
      ConsultasPage.confirmCallback()
    }
  })
}
