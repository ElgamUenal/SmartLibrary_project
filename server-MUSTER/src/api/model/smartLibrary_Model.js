import { query } from '../../../boilerplate/db/index.js';

// eslint-disable-next-line import/prefer-default-export
export const getbücher = async () => {
  const { rows } = await query('SELECT * from buecher');
  return rows;
};

// Buch loschen
export const deleteBuch = async (id) => {
  const { rows } = await query('DELETE FROM buecher WHERE id = $1 returning * ', [id]);
  return rows[0];
};

// Buch hinzufügen

export const addBuch = async (buch) => {
  const {
    isbn,
    anzahl,
    entlehnung,
    verlag,
    jahr,
    titel,
    status,
    bild,
    administrator,
    sid,
    autor,
    kid,
    beschreibung,
  } = buch;

  const { rows } = await query(
    `INSERT INTO buecher (
      isbn, anzahl, entlehnung, verlag, jahr, titel, status, bild,
      administrator, sid, autor, kid, beschreibung
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
    ) RETURNING *`,
    [
      isbn,
      anzahl,
      entlehnung,
      verlag,
      jahr,
      titel,
      status,
      bild,
      administrator,
      sid,
      autor,
      kid,
      beschreibung,
    ],
  );

  return rows[0];
};

// Get werke
export const getWerkeByBuchId = async (buchId) => {
  const { rows } = await query(
    'SELECT * FROM enthaltene_werke WHERE buch_id = $1',
    [buchId],
  );
  return rows;
};
