interface Migration {
    name: string
    file: string
    processed?: boolean
}

export const migrationConfig: Migration[] = []
