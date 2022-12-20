import {Router} from 'express';
import randomsController from '../controllers/randoms.controller.js';

const randomsRouter = Router();

randomsRouter.get('/', randomsController);

export default randomsRouter;