import controllers from './controllers';
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.static('dist'));
app.use(express.json());
app.use('/investment', controllers);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
