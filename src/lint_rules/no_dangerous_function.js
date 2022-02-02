const lintCode = (context, node) => {
    const filePath = context.getFilename()
    const cwd = context.getCwd()
    const relativeFilePath = filePath.replace(cwd, '')
    if (relativeFilePath.startsWith('/dangerous')) {
        return
    }

    context.report({
        node,
        message: 'function name cannot be "dangerous"',
        fix: (fixer) => fixer.replaceText(node, 'notDangerous')
    })
}

// https://eslint.org/docs/developer-guide/working-with-rules - working with custom rules
module.exports = {
    meta: {
        type: 'problem',
        fixable: 'code',
        docs: {
            description: 'Disallow the use of the dangerous function outside of `dangerous/`.',
            category: 'Possible Errors'
        },
        schema: []
    },
    create: (context) => ({
        CallExpression(node) {
            if (node.callee.name === 'dangerous') {
                lintCode(context, node.callee)
            }
        },
        FunctionDeclaration(node) {
            if (node.id.name === 'dangerous') {
                lintCode(context, node.id)
            }
        }
    })
}
