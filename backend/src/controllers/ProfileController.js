const connection = require('../database/connection');

const table_incidents = 'incidents';

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const incidents = await connection(table_incidents)
      .where('ong_id', ong_id)
      .select('*');

    return response.json(incidents);
  }
};
