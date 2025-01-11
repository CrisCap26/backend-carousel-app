import express from 'express';
import cors from 'cors';
import router from './files/app.controller.js';

const app = express();
const port = process.env.PORT || 3030;

const corsOptions = {
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/files', router)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});