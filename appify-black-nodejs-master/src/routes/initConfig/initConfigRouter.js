import { Router } from 'express';
import { initConfigController } from '../../controllers/initializeConfig/initializeController.js';
import { signUpController } from '../../controllers/initializeConfig/initializeController.js';
const router = Router()

router.post('/registroUser', signUpController)
router.post('/configDefault', initConfigController)


export default router;