/**
 * Funções Utilitárias
 */
const Utils = {
  /**
   * Formata data para exibição (DD/MM/YYYY)
   */
  formatDate(dateString) {
    if (!dateString) return "-"
    const [year, month, day] = dateString.split("-")
    return `${day}/${month}/${year}`
  },

  /**
   * Formata valor monetário
   */
  formatCurrency(value) {
    if (value == null) return "R$ 0,00"
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  },

  /**
   * Retorna classe CSS para badge de categoria
   */
  getCategoryBadgeClass(categoria) {
    const classes = {
      MEDICAMENTO: "bg-primary",
      EQUIPAMENTO: "bg-success",
      EXAME: "bg-info",
      PROCEDIMENTO: "bg-warning text-dark",
    }
    return classes[categoria] || "bg-secondary"
  },

  /**
   * Escapa HTML para prevenir XSS
   */
  escapeHtml(text) {
    if (!text) return ""
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  },

  /**
   * Gera ID único
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  },
}
