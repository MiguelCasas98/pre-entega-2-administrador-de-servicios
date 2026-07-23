import { Router } from 'express';
import { ServiceManager } from '../managers/ServiceManager.js';

const router = Router();
const manager = new ServiceManager();

// GET /api/services
router.get('/', (req, res) => {
  const { category, available } = req.query;

  let services = manager.getServices();

  if (category) {
    services = services.filter(s => s.category === category);
  }

  if (available !== undefined) {
    const isAvailable = available === 'true';
    services = services.filter(s => s.available === isAvailable);
  }

  res.status(200).json(services);
});

// GET /api/services/:sid
router.get('/:sid', (req, res) => {
  const id = Number(req.params.sid);
  const service = manager.getServiceById(id);

  if (!service) {
    return res.status(404).json({ error: 'Servicio no encontrado' });
  }

  res.status(200).json(service);
});

// POST /api/services
router.post('/', (req, res) => {
  const data = req.body;

  if (!data || typeof data !== 'object') {
    return res.status(400).json({ error: 'Body inválido o vacío' });
  }

  if (data.id) {
    return res.status(400).json({ error: 'El id no debe enviarse en el body' });
  }

  const required = ['name', 'description', 'duration', 'price', 'category', 'available'];
  const missing = required.filter(f => data[f] === undefined);

  if (missing.length > 0) {
    return res.status(400).json({ error: `Faltan campos: ${missing.join(', ')}` });
  }

  const newService = manager.addService(data);
  res.status(201).json(newService);
});

// PUT /api/services/:sid
router.put('/:sid', (req, res) => {
  const id = Number(req.params.sid);
  const data = req.body;

  if (!data || typeof data !== 'object') {
    return res.status(400).json({ error: 'Body inválido o vacío' });
  }

  if (data.id && data.id !== id) {
    return res.status(400).json({ error: 'No se permite modificar el id' });
  }

  const updated = manager.updateService(id, data);

  if (!updated) {
    return res.status(404).json({ error: 'Servicio no encontrado' });
  }

  res.status(200).json(updated);
});

// DELETE /api/services/:sid
router.delete('/:sid', (req, res) => {
  const id = Number(req.params.sid);
  const deleted = manager.deleteService(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Servicio no encontrado' });
  }

  res.status(200).json({ message: 'Servicio eliminado correctamente' });
});

export const servicesRouter = router;