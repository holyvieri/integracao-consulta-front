/**
 * Gerenciamento de Estado
 */
const CONFIG = {
  STORAGE_KEYS: {
    TOKEN: "token",
    USER: "user",
  },
}

const State = {
  data: {
    pacientes: [],
    medicos: [],
    consultas: [],
    materiaisTemp: [],
  },

  // Token
  getToken() {
    return localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN)
  },

  setToken(token) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.TOKEN, token)
  },

  clearToken() {
    localStorage.removeItem(CONFIG.STORAGE_KEYS.TOKEN)
  },

  // User
  getUser() {
    const user = localStorage.getItem(CONFIG.STORAGE_KEYS.USER)
    return user ? JSON.parse(user) : null
  },

  setUser(user) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(user))
  },

  clearUser() {
    localStorage.removeItem(CONFIG.STORAGE_KEYS.USER)
  },

  // Data getters/setters
  setPacientes(pacientes) {
    this.data.pacientes = pacientes || []
  },

  getPacientes() {
    return this.data.pacientes
  },

  setMedicos(medicos) {
    this.data.medicos = medicos || []
  },

  getMedicos() {
    return this.data.medicos
  },

  setConsultas(consultas) {
    this.data.consultas = consultas || []
  },

  getConsultas() {
    return this.data.consultas
  },

  // Materiais temporários
  clearMateriais() {
    this.data.materiaisTemp = []
  },

  addMaterial(material) {
    this.data.materiaisTemp.push(material)
  },

  removeMaterial(index) {
    this.data.materiaisTemp.splice(index, 1)
  },

  getMateriais() {
    return [...this.data.materiaisTemp]
  },

  setMateriais(materiais) {
    this.data.materiaisTemp = materiais || []
  },
}
