import { Router } from 'express';

// import Controllers

import OngController from './app/controllers/OngController';
import SessionController from './app/controllers/SessionController';

const routes = Router();
// ONGS

// Create Ong

routes.post('/ongs', OngController.store);

// Sessions

// Create session
routes.post('/sessions/:id', SessionController.store);

export default routes;
