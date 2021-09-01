import { Router } from 'express';
import UsersController from '../controllers/usersController';

const router = Router();

router.get('/', UsersController.getAll);

router.post('/', UsersController.create);

router.get('/:id', UsersController.getById);

router.put('/:id', UsersController.update);

router.delete('/:id', UsersController.delete);

export default router;
