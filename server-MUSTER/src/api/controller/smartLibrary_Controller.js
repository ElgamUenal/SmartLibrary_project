import asyncHandler from 'express-async-handler';
import * as model from '../model/smartLibrary_Model.js';

// eslint-disable-next-line import/prefer-default-export
export const getbücher = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getbücher());
});

// eslint-disable-next-line consistent-return
export const deleteBuch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const success = await model.deleteBuch(id);

  if (!success) {
    return res.status(404).json({ error: 'Buch nicht gefunden' });
  }

  res.status(200).json({ success: true, message: 'Buch gelöscht' });
});

// eslint-disable-next-line consistent-return
export const addBuch = asyncHandler(async (req, res) => {
  console.log('Empfangene Daten:', req.body);
  console.log('Headers:', req.headers);
  console.log('Body-Type:', req.headers['content-type']);
  console.log('Empfangene Daten:', req.body);

  const neuesBuch = await model.addBuch(req.body);

  if (!neuesBuch) {
    return res.status(400).json({
      success: false,
      message: 'Buch konnte nicht hinzugefügt werden',
    });
  }

  res.status(201).json({
    success: true,
    message: 'Buch erfolgreich hinzugefügt',
    buch: neuesBuch,
  });
});
