import type { FastifyInstance } from 'fastify';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';

describe('rotas de tarefas', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = buildApp({ logger: false });
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /tasks lista as tarefas', async () => {
    const response = await app.inject({ method: 'GET', url: '/tasks' });

    expect(response.statusCode).toBe(200);
    const tasks = response.json();
    expect(tasks).toHaveLength(5);
    for (const task of tasks) {
      expect(task).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          completed: expect.any(Boolean),
        }),
      );
    }
  });

  it('POST /tasks cria uma tarefa', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: { title: 'Estudar TypeScript' },
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        completed: false,
      }),
    );
  });

  it('PATCH /tasks/:id edita uma tarefa', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: '/tasks/2',
      payload: { title: 'Organizar a mesa de trabalho' },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(
      expect.objectContaining({ id: expect.any(Number), title: expect.any(String) }),
    );
  });

  it('PATCH /tasks/:id/toggle alterna a conclusão de uma tarefa', async () => {
    const response = await app.inject({ method: 'PATCH', url: '/tasks/1/toggle' });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(
      expect.objectContaining({ id: expect.any(Number), completed: expect.any(Boolean) }),
    );
  });

  it('DELETE /tasks/:id exclui uma tarefa', async () => {
    const response = await app.inject({ method: 'DELETE', url: '/tasks/3' });

    expect(response.statusCode).toBe(204);
    expect(response.body).toBe('');
  });
});
