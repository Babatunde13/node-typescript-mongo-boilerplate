import { appendFileSync, mkdirSync } from 'fs'

enum LogLevel {
    INFO = 'info',
    ERROR = 'error',
    WARN = 'warn',
    SUCCESS = 'success',
}

class Logger {
	private static readonly levelToConsole = {
		error: '\x1b[31m',
		success: '\x1b[32m',
		warn: '\x1b[33m',
		info: '\x1b[34m',
        default: '\x1b[0m',
	}

    private static readonly levelToFile = {
        error: 'errors.log',
        success: 'success.log',
        warn: 'debug.log',
        info: 'info.log',
        default: 'info.log',
    }

	private logToFile(message: string, options: { color: LogLevel, type: string }) {
		const date = new Date()
		const consoleMessage = `${date.toString()} - ${options.type} - ${message}\n`
        const fileName = Logger.levelToFile[options.color]
		try {
			mkdirSync('./logs')
		} catch (e) {
			// do nothing
		}
        appendFileSync(`./logs/${fileName}`, consoleMessage, { flag: 'a+' })
	}

	private logToConsole(message: string, options: { color: LogLevel, type: string }) {
		const date = new Date()
		const color: string = Logger.levelToConsole[options.color]
		const consoleMessage = `${date.toString()} - ${options.type} - ${message}`
		console.log(`${color}${consoleMessage}\x1b[0m`)
	}

	info(message: string, type: string) {
		this.logToConsole(message, { color: LogLevel.INFO, type })
		this.logToFile(message, { color: LogLevel.INFO, type })
	}

	error(message: string, type: string) {
		this.logToConsole(message, { color: LogLevel.ERROR, type })
		this.logToFile(message, { color: LogLevel.ERROR, type })
	}

	warn(message: string, type: string) {
		this.logToConsole(message, { color: LogLevel.WARN, type })
		this.logToFile(message, { color: LogLevel.WARN, type })
	}

	success(message: string, type: string) {
		this.logToConsole(message, { color: LogLevel.SUCCESS, type })
		this.logToFile(message, { color: LogLevel.SUCCESS, type })
	}
}

const logger = new Logger()

export default logger
