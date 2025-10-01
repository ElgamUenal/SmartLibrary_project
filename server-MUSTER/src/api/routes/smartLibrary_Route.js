import express from 'express';
import { getbücher, deleteBuch } from '../controller/smartLibrary_Controller.js';

const router = express.Router();

router.get('/', getbücher);
router.get('/:id', deleteBuch);
export default router;
