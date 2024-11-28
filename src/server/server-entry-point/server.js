import express from 'express';
import https from 'https';
import { router as authRoutes } from '../routes/authRoutes.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import { options } from '../config/config.js';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/auth', authRoutes);

app.get('home', authenticateJWT, (req, res) => {
    res.send('Acessando rota protegida')
});

https.createServer(options, app).listen(3000, () => {
    console.log('Servidor rodando em HTTPS na porta 3000')
})