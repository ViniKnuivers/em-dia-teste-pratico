import type { FastifyReply, FastifyRequest } from 'fastify';
import type { PrismaClient } from '../database/prisma.js';

export class HealthController {
  constructor(private readonly prisma: PrismaClient) {}

  check = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', database: 'up' };
    } catch (error) {
      request.log.error(error, 'Falha ao conectar no banco de dados');
      return reply.code(503).send({ status: 'error', database: 'down' });
    }
  };
}
