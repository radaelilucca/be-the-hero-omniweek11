import Incident from '../models/Incident';
// import Ong from '../models/Ong';

class ProfileController {
  async index(req, res) {
    const incidents = await Incident.findAll({
      where: {
        ong_id: req.ongId,
      },
    });
    return res.json(incidents);
  }
}

export default new ProfileController();
