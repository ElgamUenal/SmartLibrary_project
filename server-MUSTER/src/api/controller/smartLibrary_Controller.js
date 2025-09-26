import asyncHandler from 'express-async-handler';
import * as model from '../model/smartLibrary_Model.js';

// eslint-disable-next-line import/prefer-default-export
export const gettest = asyncHandler(async (req, res) => {
  res.status(200).json(await model.gettest());
});
