import express from 'express';
import { AccountController } from '../controllers/accountController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/signup', AccountController.signup);
router.post('/login', AccountController.login);

router.use(authMiddleware);

router.get('/accounts', AccountController.getAccounts);
router.get('/accounts/:id', AccountController.getAccountById);
router.put('/accounts/:id', AccountController.updateAccount);
router.delete('/accounts/:id', AccountController.deleteAccount);

export default router;
