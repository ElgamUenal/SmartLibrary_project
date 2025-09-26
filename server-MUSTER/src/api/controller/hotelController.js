import asyncHandler from 'express-async-handler';
import * as model from '../model/hotelModel.js';

export const getHotels = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getHotels());
});

export const delReservations = asyncHandler(async (req, res) => {
  res.status(200).json(await model.delReservations(req.params.hotelid));
});

export const addReservations = asyncHandler(async (req, res) => {
  res.status(200).json(await model.addReservations(req.body));
});
