interface ErrorMetadata {
    [key: string]: any
}
export default class AppError extends Error {
    metadata?: ErrorMetadata
    type?: string
    error?: Error

    constructor(message: string, type?: string, metadata?: ErrorMetadata) {
        super(message)
        this.type = type
        this.metadata = metadata
    }

    addMetadata(metadata: ErrorMetadata) {
        this.metadata = this.metadata ? { ...this.metadata, ...metadata } : metadata
    }
}
