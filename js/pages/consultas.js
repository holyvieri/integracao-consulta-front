/**
 * Página Consultas
 */

// Declare variables before using them
const Api = {} // Placeholder for Api object
const State = {} // Placeholder for State object
const UI = {} // Placeholder for UI object
const Utils = {} // Placeholder for Utils object

const ConsultasPage = {
  editingId: null,
  confirmCallback: null,

  async load() {
    try {
      const [consultas, pacientes, medicos] = await Promise.all([
        Api.getConsultas(),
        Api.getPacientes(),
        Api.getMedicos(),
      ])

      State.setConsultas(consultas)
      State.setPacientes(pacientes)
      State.setMedicos(medicos)

      this.render(consultas)
      this.populateSelects()
    } catch (error) {
      UI.showAlert("Erro ao carregar consultas: " + error.message, "danger")
    }
  },

  render(consultas) {
    const tbody = document.getElementById("consultas-table-body")

    if (!consultas.length) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">Nenhuma consulta encontrada</td></tr>'
      return
    }

    tbody.innerHTML = consultas
      .map(
        (c) => `
            <tr>
                <td>${c.id}</td>
                <td>${Utils.formatDate(c.data)}</td>
                <td>${Utils.escapeHtml(c.paciente?.nome || "-")}</td>
                <td>${Utils.escapeHtml(c.medico?.nome || "-")}</td>
                <td>${Utils.formatCurrency(c.valor)}</td>
                <td><span class="badge ${Utils.getCategoryBadgeClass(c.categoria)}">${c.categoria || "-"}</span></td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-info" onclick="ConsultasPage.showDetails(${c.id})" title="Ver">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-outline-warning" onclick="ConsultasPage.edit(${c.id})" title="Editar">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-danger" onclick="ConsultasPage.confirmDelete(${c.id})" title="Cancelar">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `,
      )
      .join("")
  },

  populateSelects() {
    const pacienteSelect = document.getElementById("consulta-paciente")
    const medicoSelect = document.getElementById("consulta-medico")

    pacienteSelect.innerHTML =
      '<option value="">Selecione...</option>' +
      State.getPacientes()
        .map((p) => `<option value="${p.id}">${Utils.escapeHtml(p.nome)} - ${Utils.escapeHtml(p.cpf)}</option>`)
        .join("")

    medicoSelect.innerHTML =
      '<option value="">Selecione...</option>' +
      State.getMedicos()
        .map((m) => `<option value="${m.id}">${Utils.escapeHtml(m.nome)} - CRM: ${Utils.escapeHtml(m.crm)}</option>`)
        .join("")
  },

  openNew() {
    this.editingId = null
    State.clearMateriais()

    document.getElementById("modal-consulta-title").innerHTML = '<i class="bi bi-calendar-plus me-2"></i>Nova Consulta'
    document.getElementById("form-consulta").reset()
    document.getElementById("consulta-id").value = ""
    this.renderMateriais()

    UI.openModal("modal-consulta")
  },

  async edit(id) {
    try {
      const consulta = await Api.getConsulta(id)
      this.editingId = id

      document.getElementById("modal-consulta-title").innerHTML = '<i class="bi bi-pencil me-2"></i>Editar Consulta'
      document.getElementById("consulta-id").value = consulta.id
      document.getElementById("consulta-data").value = consulta.data
      document.getElementById("consulta-valor").value = consulta.valor || 0
      document.getElementById("consulta-paciente").value = consulta.paciente?.id || ""
      document.getElementById("consulta-medico").value = consulta.medico?.id || ""
      document.getElementById("consulta-categoria").value = consulta.categoria || ""
      document.getElementById("consulta-quantidade").value = consulta.quantidadeMaterial || 0
      document.getElementById("consulta-descricao").value = consulta.descricao || ""

      State.setMateriais(consulta.materiaisRequisitados || [])
      this.renderMateriais()

      UI.openModal("modal-consulta")
    } catch (error) {
      UI.showAlert("Erro ao carregar consulta: " + error.message, "danger")
    }
  },

  async save() {
    const user = State.getUser()

    const data = {
      data: document.getElementById("consulta-data").value,
      descricao: document.getElementById("consulta-descricao").value,
      medicoId: Number.parseInt(document.getElementById("consulta-medico").value),
      pacienteId: Number.parseInt(document.getElementById("consulta-paciente").value),
      recepcionistaId: user.id,
      materiaisRequisitados: State.getMateriais(),
      valor: Number.parseFloat(document.getElementById("consulta-valor").value) || 0,
      categoria: document.getElementById("consulta-categoria").value,
      quantidadeMaterial: Number.parseInt(document.getElementById("consulta-quantidade").value) || 0,
    }

    try {
      if (this.editingId) {
        await Api.updateConsulta(this.editingId, data)
        UI.showAlert("Consulta atualizada com sucesso! Notificação enviada.", "success")
      } else {
        await Api.createConsulta(data)
        UI.showAlert("Consulta criada com sucesso!", "success")
      }

      UI.closeModal("modal-consulta")
      this.load()
    } catch (error) {
      UI.showAlert("Erro ao salvar consulta: " + error.message, "danger")
    }
  },

  async showDetails(id) {
    try {
      const c = await Api.getConsulta(id)

      const materiais =
        (c.materiaisRequisitados || []).length > 0
          ? c.materiaisRequisitados
              .map((m) => `<span class="badge bg-secondary me-1">${Utils.escapeHtml(m)}</span>`)
              .join("")
          : "-"

      document.getElementById("modal-consulta-detalhes-body").innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <div class="detail-item">
                            <div class="detail-label">ID</div>
                            <div class="detail-value">${c.id}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Data</div>
                            <div class="detail-value">${Utils.formatDate(c.data)}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Paciente</div>
                            <div class="detail-value">${Utils.escapeHtml(c.paciente?.nome || "-")}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Médico</div>
                            <div class="detail-value">${Utils.escapeHtml(c.medico?.nome || "-")} ${c.medico?.crm ? `(CRM: ${c.medico.crm})` : ""}</div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="detail-item">
                            <div class="detail-label">Valor</div>
                            <div class="detail-value">${Utils.formatCurrency(c.valor)}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Categoria</div>
                            <div class="detail-value"><span class="badge ${Utils.getCategoryBadgeClass(c.categoria)}">${c.categoria || "-"}</span></div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Qtd. Material</div>
                            <div class="detail-value">${c.quantidadeMaterial || 0}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Recepcionista</div>
                            <div class="detail-value">${Utils.escapeHtml(c.recepcionista?.nome || "-")}</div>
                        </div>
                    </div>
                </div>
                <div class="detail-item mt-3">
                    <div class="detail-label">Descrição</div>
                    <div class="detail-value">${Utils.escapeHtml(c.descricao || "-")}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Materiais Requisitados</div>
                    <div class="detail-value">${materiais}</div>
                </div>
            `

      UI.openModal("modal-consulta-detalhes")
    } catch (error) {
      UI.showAlert("Erro ao carregar consulta: " + error.message, "danger")
    }
  },

  confirmDelete(id) {
    this.confirmCallback = () => this.delete(id)
    UI.openModal("modal-confirm")
  },

  async delete(id) {
    try {
      await Api.deleteConsulta(id)
      UI.showAlert("Consulta cancelada! Paciente e médico foram notificados.", "success")
      UI.closeModal("modal-confirm")
      this.load()
    } catch (error) {
      UI.showAlert("Erro ao cancelar consulta: " + error.message, "danger")
    }
  },

  addMaterial() {
    const input = document.getElementById("novo-material")
    const material = input.value.trim()

    if (material) {
      State.addMaterial(material)
      this.renderMateriais()
      input.value = ""
    }
  },

  removeMaterial(index) {
    State.removeMaterial(index)
    this.renderMateriais()
  },

  renderMateriais() {
    const lista = document.getElementById("lista-materiais")
    const materiais = State.getMateriais()

    if (!materiais.length) {
      lista.innerHTML = '<li class="list-group-item text-muted">Nenhum material adicionado</li>'
      return
    }

    lista.innerHTML = materiais
      .map(
        (m, i) => `
            <li class="list-group-item">
                <span>${Utils.escapeHtml(m)}</span>
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="ConsultasPage.removeMaterial(${i})">
                    <i class="bi bi-x"></i>
                </button>
            </li>
        `,
      )
      .join("")
  },
}
