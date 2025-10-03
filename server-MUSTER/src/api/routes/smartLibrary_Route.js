import express from 'express';
import { getbücher, deleteBuch, addBuch } from '../controller/smartLibrary_Controller.js';

const router = express.Router();

router.get('/', getbücher);
router.delete('/delete/:id', deleteBuch);
router.post('/create', addBuch); // <- direkt den Controller nehmen

export default router;
