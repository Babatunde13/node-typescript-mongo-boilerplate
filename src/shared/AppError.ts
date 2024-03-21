interface ErrorMetadata {
    [key: string]: any
}

export default class AppError extends Error {
    metadata?: ErrorMetadata
    statusCode?: number
    type?: string
    error?: Error

    constructor({ message, metadata, type, statusCode, error }: { message?: string, type?: string, metadata?: ErrorMetadata, statusCode?: number, error?: Error | string }) {
        super(message)
        this.type = type
        this.metadata = metadata
        this.statusCode = statusCode
        this.error = error instanceof Error ? error : new Error(error)
    }

    addMetadata(metadata: ErrorMetadata) {
        this.metadata = this.metadata ? { ...this.metadata, ...metadata } : metadata
    }

    addStatusCode(statusCode: number) {
        this.statusCode = statusCode
    }

    addType(type: string) {
        this.type = type
    }

    addError(error: Error) {
        this.error = error
    }

    toJSON() {
        return {
            message: this.message,
            type: this.type,
            metadata: this.metadata,
            statusCode: this.statusCode,
            stack: this.stack,
        }
    }
}
