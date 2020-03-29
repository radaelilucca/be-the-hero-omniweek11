import Incident from '../models/Incident';
// import Ong from '../models/Ong';

class ProfileController {
  async index(req, res) {
    const ong_id = req.headers.authorization;
    const { page = 1 } = req.query;
    const incidents = await Incident.findAll({
      where: {
        ong_id,
      },
      order: ['created_at'],
      limit: 4,
      offset: (page - 1) * 20,
    });
    return res.json(incidents);
  }
}

export default new ProfileController();
