import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();
const PORT = process.env.PORT || 3000;

import web from './routes/web.js';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',web);
app.use('/contact',web);
app.use('/about',web);
app.use('/createPost',web);

app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`);
});
