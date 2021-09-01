import { Router } from 'express';
import CarsController from '../controllers/carsController';

const router = Router();

router.post('/:userId/create', CarsController.create);

router.get('/', CarsController.getAll);

router.get('/:id', CarsController.getById);

router.put('/:id', CarsController.update);

router.delete('/:id', CarsController.delete);

export default router;
