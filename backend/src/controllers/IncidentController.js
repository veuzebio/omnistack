const connection = require('../database/connection');

const table_incidents = 'incidents';
const table_ongs = 'ongs';

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;
    let ongs = [];

    const [registers] = await connection(table_incidents).count();
    const count = registers['count(*)'];

    response.header('X-Total-Count', count);

    if (count > 0) {
      ongs = await connection(table_incidents)
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(
          'incidents.*',
          'ongs.name',
          'ongs.email',
          'ongs.whatsapp',
          'ongs.city',
          'ongs.uf'
        );
    }

    return response.json(ongs);
  },
  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection(table_incidents).insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id });
  },
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection(table_incidents)
      .where('id', id)
      .select('ong_id')
      .first();

    if (!incident || incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection(table_incidents)
      .where('id', id)
      .delete();

    return response.status(204).send();
  }
};
