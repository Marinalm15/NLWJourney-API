import fastify from "fastify";
import { prisma } from "./lib/prisma";

const app = fastify();

app.get('/cadastrar', async () => {
    await prisma.trip.create({
        data: {
            destination: 'Florianópolis',
            start_at: new Date(),
            end_at: new Date(),
        }
    })

    return 'Registro cadastrado com sucesso!'
})

app.get('/listar', async () => {
    const trips = await prisma.trip.findMany()

    return trips
})

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP server running on http://localhost:3333")
})