import { Server } from './server';

(async () => {
  try {
    const server = new Server();
    server.init();
    await server.start();
  } catch (error) {
    // tratar depois
  }
})();
