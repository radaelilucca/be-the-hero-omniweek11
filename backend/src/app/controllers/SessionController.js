import jwt from 'jsonwebtoken';
import Ong from '../models/Ong';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { id } = req.params;

    // check if this id exist

    const ong = await Ong.findByPk(id);

    if (!ong) {
      return res
        .status(404)
        .json({ error: 'Ong not found - Check the Id and try again' });
    }

    const { name } = ong;

    return res.json({
      ong: {
        id,
        name,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
