import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/gabinete', (request, reply) => {
// Acessando dados do corpo da requisição
    const {modelo, marca, preco} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        modelo: modelo,
        marca: marca,
        preco: preco,
    })

    return reply.status(201).send
})

server.get('/gabinete', (request) => {
    const search = request.query.search
    console.log(search)
    const gabinetes = database.list(search)
    console.log(gabinetes)
    return gabinetes
})

server.put('/gabinetes/:id', (request, reply) => {
    const gabineteId = request.params.id
    const {modelo, marca, preco} = request.body
    const gabinete = database.update(gabineteId, {
        modelo: modelo,
        marca: marca,
        preco: preco,
    })
    return reply.status(204).send()
})

server.delete('/gabinetes/:id', (request, reply) => {
    const gabineteId = request.params.id

    database.delete(gabineteId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})