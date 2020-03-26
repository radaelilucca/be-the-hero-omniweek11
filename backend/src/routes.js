import { Router } from 'express';

// import Controllers

import OngController from './app/controllers/OngController';
import SessionController from './app/controllers/SessionController';
import IncidentController from './app/controllers/IncidentController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();
// ONGS

// Create Ong

routes.post('/ongs', OngController.store);

// Sessions

// Create session
routes.post('/sessions/:id', SessionController.store);

// Login required routes

routes.use(authMiddleware);

// INCIDENTS

// Create incident
routes.post('/incidents/create', IncidentController.store);

// Delete / finish incident
routes.delete('/incidents/delete/:incident_id', IncidentController.delete);

export default routes;
