import Ong from '../models/Ong';
import Incident from '../models/Incident';

class IncidentController {
  async store(req, res) {
    const { title, description, amount } = req.body;

    const ongId = req.headers.authorization;

    const ong = await Ong.findByPk(ongId);

    // check the logged ong

    if (!ong) {
      return res
        .status(401)
        .json({ error: 'Only logged ONGs can create an Incident' });
    }

    const incident = await Incident.create({
      ong_id: ong.id,
      title,
      description,
      amount,
    });

    return res.json(incident);
  }

  async delete(req, res) {
    const { incident_id } = req.params;
    // const ongId = req.headers.authorization;
    const incident = await Incident.findByPk(incident_id);

    // check if incident exist
    if (!incident) {
      return res
        .status(404)
        .json({ error: 'Incident not found - Check the ID and try again' });
    }

    await incident.destroy();

    return res.status(204).send();
  }

  // list all incidents
  async index(req, res) {
    const { page = 1 } = req.query;
    const incidents = await Incident.findAll({
      order: ['created_at'],
      offset: (page - 1) * 20,
    });

    return res.json(incidents);
  }
}

export default new IncidentController();
