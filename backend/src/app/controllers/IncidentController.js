import Ong from '../models/Ong';
import Incident from '../models/Incident';

class IncidentController {
  async store(req, res) {
    const { title, description, amount } = req.body;

    const { ongId } = req;

    const ong = await Ong.findByPk(ongId);

    console.log('ID QUE TA CHEGANDO', ongId);

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
    const ongId = Number(req.ongId);
    const incident = await Incident.findByPk(incident_id);

    // check if incident exist
    if (!incident) {
      return res
        .status(404)
        .json({ error: 'Incident not found - Check the ID and try again' });
    }

    if (Number(incident.ong_id) !== ongId) {
      return res
        .status(401)
        .json({ error: 'Incidents can only be deleted by the creator' });
    }

    await incident.destroy();

    return res.status(204).send();
  }

  // list all incidents
  async index(req, res) {
    const { page = 1 } = req.query;
    const incidents = await Incident.findAndCountAll({
      limit: 4,
      offset: (page - 1) * 4,
      include: [
        {
          model: Ong,
          as: 'ong',
          attributes: ['id', 'name', 'city', 'uf', 'whatsapp', 'email'],
        },
      ],
    });
    res.set('count', incidents.count);
    return res.json(incidents.rows);
  }
}

export default new IncidentController();
