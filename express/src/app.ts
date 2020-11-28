import express from 'express';
import sessionManager from './services/sessionManager';
import cors from './services/cors';
import compression from 'compression';
import { authRouter } from './routers/authRouter';
import { productRouter } from './routers/productRouters';
import { ResponseMessage } from './_types';
const app = express();

app.use(compression());
app.use(cors);
app.use(sessionManager);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Compile response message
app.use((_, res, next) => {
  res.locals.msg = new ResponseMessage(200, {});
  return next();
});

// Routes handler
app.get('/', (_, res, next) => {
  const message = res.locals.msg as ResponseMessage;
  message.addData({ message: 'Hello' });
  return next();
});

app.use('/auth', authRouter);
app.use('/prod', productRouter);

// Default error handler
// Always check for error
app.use((_, res, next) => {
  if (res.locals.err) {
    const error = res.locals.err as ResponseMessage;
    console.log();
    console.log('//--------------------------//');
    console.error(`ENCOUNTER ERROR:`);
    console.error(error.data);
    console.log('//--------------------------//');
    console.log();

    return res.status(error.status).json(error.data);
  }
  return next();
});

// Send response message if no error
app.use((_, res) => {
  if (!res.locals.err) {
    const response = res.locals.msg as ResponseMessage;
    return res.status(response.status).json(response.data);
  }
});

export default app;
