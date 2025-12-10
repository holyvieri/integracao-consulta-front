/**
 * Página Pacientes
 */
const Api = {} // Placeholder for Api variable declaration or import
const State = {} // Placeholder for State variable declaration or import
const UI = {} // Placeholder for UI variable declaration or import
const Utils = {} // Placeholder for Utils variable declaration or import

const PacientesPage = {
  async load() {
    try {
      const pacientes = await Api.getPacientes()
      State.setPacientes(pacientes)
      this.render(pacientes)
    } catch (error) {
      UI.showAlert("Erro ao carregar pacientes: " + error.message, "danger")
    }
  },

  render(pacientes) {
    const tbody = document.getElementById("pacientes-table-body")

    if (!pacientes.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Nenhum paciente encontrado</td></tr>'
      return
    }

    tbody.innerHTML = pacientes
      .map(
        (p) => `
            <tr>
                <td>${p.id}</td>
                <td>${Utils.escapeHtml(p.nome)}</td>
                <td>${Utils.escapeHtml(p.cpf)}</td>
                <td>${Utils.escapeHtml(p.email || "-")}</td>
                <td>${Utils.escapeHtml(p.telefone || "-")}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="PacientesPage.showDetails(${p.id})">
                        <i class="bi bi-eye"></i> Ver
                    </button>
                </td>
            </tr>
        `,
      )
      .join("")
  },

  async showDetails(id) {
    try {
      const paciente = await Api.getPaciente(id)

      document.getElementById("modal-paciente-body").innerHTML = `
                <div class="detail-item">
                    <div class="detail-label">ID</div>
                    <div class="detail-value">${paciente.id}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Nome</div>
                    <div class="detail-value">${Utils.escapeHtml(paciente.nome)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">CPF</div>
                    <div class="detail-value">${Utils.escapeHtml(paciente.cpf)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Email</div>
                    <div class="detail-value">${Utils.escapeHtml(paciente.email || "-")}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Telefone</div>
                    <div class="detail-value">${Utils.escapeHtml(paciente.telefone || "-")}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Sexo</div>
                    <div class="detail-value">${Utils.escapeHtml(paciente.sexo || "-")}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Histórico</div>
                    <div class="detail-value">${Utils.escapeHtml(paciente.historico || "-")}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Restrições</div>
                    <div class="detail-value">${Utils.escapeHtml(paciente.restricoes || "-")}</div>
                </div>
            `

      UI.openModal("modal-paciente")
    } catch (error) {
      UI.showAlert("Erro ao carregar paciente: " + error.message, "danger")
    }
  },
}
