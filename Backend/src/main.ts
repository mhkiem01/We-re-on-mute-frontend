// main.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import registerRoute from './routes/register';
import loginRoute from './routes/login';
import deleteUserRoute from './routes/deleteUser';
import sendInvoiceByEmailRoute from './routes/sendInvoiceByEmail';
import sendFileInternallyRoute from './routes/sendFileInternally';
import receiveFileRoute from './routes/receiveFile';
import checkInternalReceivingRoute from './routes/checkInternalReceiving';
import notificationsRoute from './routes/notifications';
import possibleFilesRoute from './routes/possibleFiles';

const app = express();

app.use(bodyParser.json());


app.use(cors());

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/user', deleteUserRoute);
app.use('/sendInvoiceByEmail', sendInvoiceByEmailRoute);
app.use('/sendFileInternally', sendFileInternallyRoute);
app.use('/receiveFile', receiveFileRoute);
app.use('/checkInternalReceiving', checkInternalReceivingRoute);
app.use('/notifications', notificationsRoute);
app.use('/possibleFiles', possibleFilesRoute);

export default app;