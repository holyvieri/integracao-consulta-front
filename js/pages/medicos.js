/**
 * Página Médicos
 */
const Api = {} // Placeholder for Api variable
const State = {} // Placeholder for State variable
const UI = {} // Placeholder for UI variable
const Utils = {} // Placeholder for Utils variable

const MedicosPage = {
  async load() {
    try {
      const medicos = await Api.getMedicos()
      State.setMedicos(medicos)
      this.render(medicos)
    } catch (error) {
      UI.showAlert("Erro ao carregar médicos: " + error.message, "danger")
    }
  },

  render(medicos) {
    const tbody = document.getElementById("medicos-table-body")

    if (!medicos.length) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">Nenhum médico encontrado</td></tr>'
      return
    }

    tbody.innerHTML = medicos
      .map(
        (m) => `
            <tr>
                <td>${m.id}</td>
                <td>${Utils.escapeHtml(m.nome)}</td>
                <td>${Utils.escapeHtml(m.crm)}</td>
                <td>${Utils.escapeHtml(m.especializacao || "-")}</td>
                <td>${Utils.escapeHtml(m.email || "-")}</td>
                <td>${Utils.escapeHtml(m.telefone || "-")}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="MedicosPage.showDetails(${m.id})">
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
      const medico = await Api.getMedico(id)

      document.getElementById("modal-medico-body").innerHTML = `
                <div class="detail-item">
                    <div class="detail-label">ID</div>
                    <div class="detail-value">${medico.id}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Nome</div>
                    <div class="detail-value">${Utils.escapeHtml(medico.nome)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">CRM</div>
                    <div class="detail-value">${Utils.escapeHtml(medico.crm)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Especialização</div>
                    <div class="detail-value">${Utils.escapeHtml(medico.especializacao || "-")}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Email</div>
                    <div class="detail-value">${Utils.escapeHtml(medico.email || "-")}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Telefone</div>
                    <div class="detail-value">${Utils.escapeHtml(medico.telefone || "-")}</div>
                </div>
            `

      UI.openModal("modal-medico")
    } catch (error) {
      UI.showAlert("Erro ao carregar médico: " + error.message, "danger")
    }
  },
}
