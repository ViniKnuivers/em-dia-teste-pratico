import type { FastifyInstance } from 'fastify';
import { afterAll, beforeAll, describe, expect, it, vi, afterEach } from 'vitest';
import { buildApp } from '../src/app.js';
import { TaskModel } from '../src/models/task.model.js';

describe('rotas de tarefas', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = buildApp({ logger: false });
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('GET /tasks lista as tarefas', async () => {
    const fakeTasks = [
      {
        id: 1,
        title: 'Estudar',
        completed: false,
        estimation: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'Trabalhar',
        completed: true,
        estimation: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: 'Limpar a casa',
        completed: true,
        estimation: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        title: 'Testar a listagem',
        completed: false,
        estimation: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    vi.spyOn(TaskModel.prototype, 'findAll').mockResolvedValue(fakeTasks);

    const response = await app.inject({ method: 'GET', url: '/tasks' });

    expect(response.statusCode).toBe(200);
    const tasks = response.json();
    expect(tasks).toHaveLength(4);
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
    const fakeTaskTest = {
      id: 1,
      title: 'Estudar TypeScript',
      completed: false,
      estimation: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createSpy = vi.spyOn(TaskModel.prototype, 'create').mockResolvedValue(fakeTaskTest);

    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: { title: 'Estudar TypeScript', estimation: '2026-10-29' },
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        completed: false,
      }),
    );

    expect(createSpy).toHaveBeenCalledWith({
      title: 'Estudar TypeScript',
      estimation: '2026-10-29',
    });
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
    const fakeTaskTest = {
      id: 1,
      title: 'Estudar TypeScript',
      completed: false,
      estimation: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const toggleSpy = vi.spyOn(TaskModel.prototype, 'toggle').mockResolvedValue(fakeTaskTest);
    const response = await app.inject({ method: 'PATCH', url: '/tasks/1/toggle' });

    expect(toggleSpy).toHaveBeenCalledWith(1);

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
