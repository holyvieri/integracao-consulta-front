/**
 * Página Dashboard
 */
const Api = {} // Placeholder for Api declaration
const State = {} // Placeholder for State declaration
const UI = {} // Placeholder for UI declaration

const DashboardPage = {
  async load() {
    try {
      const [pacientes, medicos, consultas] = await Promise.all([
        Api.getPacientes(),
        Api.getMedicos(),
        Api.getConsultas(),
      ])

      State.setPacientes(pacientes)
      State.setMedicos(medicos)
      State.setConsultas(consultas)

      document.getElementById("total-pacientes").textContent = pacientes.length
      document.getElementById("total-medicos").textContent = medicos.length
      document.getElementById("total-consultas").textContent = consultas.length
    } catch (error) {
      UI.showAlert("Erro ao carregar dashboard: " + error.message, "danger")
    }
  },
}
