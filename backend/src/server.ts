import { buildApp } from './app.js';
import { env } from './config/env.js';

const app = buildApp({ logger: true });

await app.listen({ port: env.port, host: env.host });
