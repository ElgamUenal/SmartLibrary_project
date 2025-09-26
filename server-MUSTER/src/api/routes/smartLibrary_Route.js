import express from 'express';
import { gettest } from '../controller/smartLibrary_Controller.js';

const router = express.Router();

router.get('/', gettest);
export default router;
