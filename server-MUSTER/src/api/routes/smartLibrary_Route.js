import express from 'express';
import { getbücher, deleteBuch, addBuch, getWerkeByBuchId } from '../controller/smartLibrary_Controller.js';

const router = express.Router();

router.get('/', getbücher);
router.delete('/delete/:id', deleteBuch);
router.post('/create', addBuch);
router.get('/buecher/:buchId/werke', getWerkeByBuchId);

export default router;
