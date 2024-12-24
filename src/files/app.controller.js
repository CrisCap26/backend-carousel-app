import express from 'express';
import FilesService from './app.service.js';

const router = express.Router();
const filesService = new FilesService();

router.get('/', async (req, res) => {
  try {
    const files = await filesService.getFiles();
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los archivos', error: error.message });
  }
});

export default router;