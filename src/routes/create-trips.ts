import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import dayjs from "dayjs";

export async function createTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/trips", {
        schema: {
            body: z.object({
                destination: z.string().min(4),
                start_at: z.coerce.date(),
                end_at: z.coerce.date(),
                onner_name: z.string(),
                onner_email: z.string().email(),
            })
        }
    }, async (request) => {
        const { destination, start_at, end_at, onner_name, onner_email } = request.body

        if (dayjs(start_at).isBefore(new Date())) {
            throw new Error("Invalid trip start date.")
        }

        if (dayjs(end_at).isBefore(start_at)) {
            throw new Error("Invalid trip end date.")
        }

        const trip = await prisma.trip.create({
            data: {
                destination,
                start_at,
                end_at
            }
        })

        return { tripId: trip.id }
    })
}