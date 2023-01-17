export default function isError(e: { error: Error } | any): e is { error: Error } {
    if (!e) {
        return true
    }

    return e.error instanceof Error
}
