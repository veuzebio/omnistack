const connection = require('../database/connection');

const table_ongs = 'ongs';

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ongName = await connection(table_ongs)
      .where('id', id)
      .select('name')
      .first();

    if (!ongName) {
      return response.status(400).json({ error: 'No ONG found with this ID.' });
    }

    return response.json(ongName);
  }
};
