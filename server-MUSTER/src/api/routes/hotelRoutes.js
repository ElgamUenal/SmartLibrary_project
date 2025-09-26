import express from 'express';
import { getHotels, delReservations, addReservations } from '../controller/hotelController.js';

const router = express.Router();

router.get('/', getHotels);
router.delete('/reservations/:hotelid', delReservations);
router.post('/reservations', addReservations);

export default router;
