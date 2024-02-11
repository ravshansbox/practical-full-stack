import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { createServer } from 'http';
import { appRouter } from './trpc';

const requestHandler = createHTTPHandler({ router: appRouter });

const server = createServer();

server.on('request', requestHandler);

server.on('listening', () => {
  console.info('Listening on', server.address());
});

server.listen(3000);
