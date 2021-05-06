const hapi = require('@hapi/hapi')
const routes = require('./routes')
const init = async () => {
    const server = hapi.server({
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '172.31.21.202',
        port: 5000,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    })

    server.route(routes)

    await server.start()
    console.log(`Server berjalan pada ${server.info.uri}`)
}

init()