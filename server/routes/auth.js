import express from 'express'
import { login, logout, register } from '../controller/auth.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router()


router.post('/login', login);
router.post('/register', register)
router.post('/logout', logout)
router.get("/check", verifyToken, (req, res) => {
    res.json({ authenticated: true, user: req.user });
})

export default router;