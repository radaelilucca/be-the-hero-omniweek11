import { Router } from 'express';

// import Controllers

import OngController from './app/controllers/OngController';
import SessionController from './app/controllers/SessionController';
import IncidentController from './app/controllers/IncidentController';
import ProfileController from './app/controllers/ProfileController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

// Create Ong

routes.post('/ongs', OngController.store);

// Create session
routes.post('/sessions/:id', SessionController.store);

// List all incidents
routes.get('/incidents/', IncidentController.index);

// ------------------- Login required routes ---------------------
routes.use(authMiddleware);

// List all ongs
routes.get('/ongs', OngController.index);
// Create incident
routes.post('/incidents/create', IncidentController.store);
// List incidents of logged ong
routes.get('/profile', ProfileController.index);
// Delete / finish incident
routes.delete('/incidents/delete/:incident_id', IncidentController.delete);

export default routes;
