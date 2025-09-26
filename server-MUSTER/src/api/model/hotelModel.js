import { query } from '../../../boilerplate/db/index.js';

export const getHotels = async () => {
  const { rows } = await query('SELECT * from hotelreservations order by id');
  return rows;
};

export const delReservations = async (hotelid) => {
  const { rows } = await query('delete from reservations where hotelid = $1 returning *', [
    hotelid,
  ]);
  return rows;
};

export const addReservations = async (body) => {
  const { rows } = await query(
    'insert into reservations (hotelid, count) values ($1,$2) returning *',
    [body.hotelid, body.count],
  );
  return rows[0];
};
