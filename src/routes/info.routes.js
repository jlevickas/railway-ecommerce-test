import {Router} from 'express';
import infoController from '../controllers/info.controller.js';

const infoRouter = Router();

infoRouter.get('/', infoController);

export default infoRouter;