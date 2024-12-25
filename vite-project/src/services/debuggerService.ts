type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface DebugConfig {
  isEnabled: boolean
  logLevel: LogLevel
  environment: string
  modules: string[]
}

class DebuggerService {
  private static instance: DebuggerService
  private config: DebugConfig = {
    isEnabled: import.meta.env.MODE === 'development',
    logLevel: 'info',
    environment: import.meta.env.MODE,
    modules: ['user', 'stay', 'order', 'system']
  }

  private constructor() {}

  static getInstance(): DebuggerService {
    if (!DebuggerService.instance) {
      DebuggerService.instance = new DebuggerService()
    }
    return DebuggerService.instance
  }

  info(module: string, message: string, data?: any): void {
    if (!this.shouldLog('info', module)) return
    console.log(`🔵 [${module.toUpperCase()}] ${message}`, data || '')
  }

  warn(module: string, message: string, data?: any): void {
    if (!this.shouldLog('warn', module)) return
    console.warn(`🟡 [${module.toUpperCase()}] ${message}`, data || '')
  }

  error(module: string, message: string, error?: any): void {
    if (!this.shouldLog('error', module)) return
    console.error(`🔴 [${module.toUpperCase()}] ${message}`, error || '')
  }

  debug(module: string, message: string, data?: any): void {
    if (!this.shouldLog('debug', module)) return
    console.debug(`⚪ [${module.toUpperCase()}] ${message}`, data || '')
  }

  private shouldLog(level: LogLevel, module: string): boolean {
    return (
      this.config.isEnabled &&
      this.config.modules.includes(module) &&
      this.getLevelPriority(level) >= this.getLevelPriority(this.config.logLevel)
    )
  }

  private getLevelPriority(level: LogLevel): number {
    const priorities = { debug: 0, info: 1, warn: 2, error: 3 }
    return priorities[level]
  }

  setConfig(config: Partial<DebugConfig>): void {
    this.config = { ...this.config, ...config }
  }
}

export const debugger = DebuggerService.getInstance()
