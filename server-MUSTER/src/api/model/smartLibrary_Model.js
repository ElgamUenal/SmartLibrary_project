import { query } from '../../../boilerplate/db/index.js';

// eslint-disable-next-line import/prefer-default-export
export const getbücher = async () => {
  const { rows } = await query('SELECT * from buecher');
  return rows;
};

// Bücher lschen
export const deleteBuch = async (id) => {
  const { rows } = await query('DELETE FROM buecher WHERE id = $1', [id]);
  return rows;
};
