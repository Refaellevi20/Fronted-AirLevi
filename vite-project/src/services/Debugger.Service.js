

class DebuggerService {
  static #instance = null
  #config = {
    isEnabled: import.meta.env.MODE === 'development',
    logLevel: 'info',
    environment: import.meta.env.MODE,
    modules: ['user', 'stay', 'order', 'system']
  }

  constructor() {
    if (DebuggerService.#instance) {
      return DebuggerService.#instance
    }
    DebuggerService.#instance = this
  }

  static getInstance() {
    if (!DebuggerService.#instance) {
      DebuggerService.#instance = new DebuggerService()
    }
    return DebuggerService.#instance
  }

  info(module, message, data) {
    if (!this.#shouldLog('info', module)) return
    console.log(`🔵 [${module.toUpperCase()}] ${message}`, data || '')
  }

  warn(module, message, data) {
    if (!this.#shouldLog('warn', module)) return
    console.warn(`🟡 [${module.toUpperCase()}] ${message}`, data || '')
  }

  error(module, message, error) {
    if (!this.#shouldLog('error', module)) return
    console.error(`🔴 [${module.toUpperCase()}] ${message}`, error || '')
  }

  debug(module, message, data) {
    if (!this.#shouldLog('debug', module)) return
    console.debug(`⚪ [${module.toUpperCase()}] ${message}`, data || '')
  }

  #shouldLog(level, module) {
    return (
      this.#config.isEnabled &&
      this.#config.modules.includes(module) &&
      this.#getLevelPriority(level) >= this.#getLevelPriority(this.#config.logLevel)
    )
  }

  #getLevelPriority(level) {
    const priorities = { debug: 0, info: 1, warn: 2, error: 3 }
    return priorities[level]
  }

  setConfig(config) {
    this.#config = { ...this.#config, ...config }
  }
}

export const debuggerService = DebuggerService.getInstance()