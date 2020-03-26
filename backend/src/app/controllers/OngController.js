import cryptoRandomString from 'crypto-random-string';
import Ong from '../models/Ong';

class OngController {
  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    // check if email or whatsapp is in use

    const ong = await Ong.findOne({
      where: {
        email,
      },
    });

    if (ong) {
      return res.status(401).json({ error: 'This e-mail is already in use' });
    }

    // Random ID generator
    const id = Number(cryptoRandomString({ length: 6, type: 'numeric' }));

    await Ong.create({
      name,
      email,
      whatsapp,
      city,
      uf,
      id,
    });

    return res.json(id);
  }

  async index(req, res) {
    const ongs = await Ong.findAll();

    return res.json(ongs);
  }
}

export default new OngController();
