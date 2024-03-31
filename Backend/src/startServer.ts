// startServer.ts
import config from './config.json';

const PORT: number = parseInt(process.env.PORT || config.port, 10);
const HOST: string = process.env.IP || 'localhost';

const startServer = (app: any) => {
  app.listen(PORT, HOST, () => {
    console.log(`Server is running on port ${PORT} at ${HOST}`);
  });
};

export default startServer;
