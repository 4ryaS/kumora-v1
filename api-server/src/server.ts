import fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import { server_routes } from "./routes/server.routes";
import { http_server } from "./socket/server.socket";

dotenv.config();

const server = fastify({ logger: true });
const PORT = process.env.PORT || 9000;
const SOCKET_PORT = process.env.SOCKET_PORT || 9001;

(async () => {
  try {
    // Register CORS plugin
    await server.register(cors, {
      origin: "http://localhost:5173",
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    });

    // Register your API routes
    server.register(server_routes, { prefix: '/api' });

    // Start the socket server
    http_server.listen(SOCKET_PORT, () => {
      server.log.info(`Socket Server is running at ${SOCKET_PORT}`);
    });

    // Start the Fastify API server
    await server.listen({ port: Number(PORT) });
    server.log.info(`API Server is running at http://localhost:${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
