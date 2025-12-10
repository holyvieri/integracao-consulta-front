/**
 * Configurações do Sistema
 */
const CONFIG = Object.freeze({
  API_BASE_URL: "http://localhost:8080/api",

  STORAGE_KEYS: {
    TOKEN: "auth_token",
    USER: "auth_user",
  },

  CATEGORIAS: [
    { value: "MEDICAMENTO", label: "Medicamento" },
    { value: "EQUIPAMENTO", label: "Equipamento" },
    { value: "EXAME", label: "Exame" },
    { value: "PROCEDIMENTO", label: "Procedimento" },
  ],
})
