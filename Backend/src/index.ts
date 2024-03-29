import app from './main';
import startServer from './startServer';
import { getData } from './datastore';

getData();
startServer(app);
