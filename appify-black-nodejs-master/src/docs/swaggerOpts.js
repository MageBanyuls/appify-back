export const swaggerOpts = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'APPIFY',
            version: '1.0.0',
            description: `Documentacion de appify\n`
        },
        servers: [
            { url: 'http://localhost:8080'}
        ]
    },
    apis: ['./src/docs/**/*.yml']
}