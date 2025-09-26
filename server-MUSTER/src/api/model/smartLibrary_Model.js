import { query } from '../../../boilerplate/db/index.js';

// eslint-disable-next-line import/prefer-default-export
export const gettest = async () => {
  const { rows } = await query('SELECT * from test');
  return rows;
};
