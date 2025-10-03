import asyncHandler from 'express-async-handler';
import * as model from '../model/smartLibrary_Model.js';

// eslint-disable-next-line import/prefer-default-export
export const getbücher = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getbücher());
});

export const deleteBuch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  res.status(200).json(await model.deleteBuch(id));
});
