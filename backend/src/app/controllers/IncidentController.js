import Ong from '../models/Ong';
import Incident from '../models/Incident';

class IncidentController {
  async store(req, res) {
    const { title, description, amount } = req.body;

    const ong = await Ong.findByPk(req.ongId);

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
    const incident = await Incident.findByPk(incident_id);

    // check if incident exist
    if (!incident) {
      return res
        .status(404)
        .json({ error: 'Incident not found - Check the ID and try again' });
    }

    const ong = await Ong.findByPk(req.ongId);

    // check if the incident belongs to the logged ong

    if (incident.ong_id !== ong.id) {
      return res
        .status(401)
        .json({ error: 'This incident was not created by the logged ONG.' });
    }

    await incident.destroy();

    return res.status(204).send();
  }

  // list all incidents
  async index(req, res) {
    const incidents = await Incident.findAll();

    return res.json(incidents);
  }
}

export default new IncidentController();
