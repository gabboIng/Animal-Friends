import express from 'express';
const router = express.Router();

router.get('/registro', (req, res) => { res.render('registro'); });
router.get('/login', (req, res) => { res.render('login'); });

export default router;