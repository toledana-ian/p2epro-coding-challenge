import express from 'express';

const app = express();

app.get('/', (req, res)=>{
    res.send('Hello');
});

app.listen(3001, ()=>{
    console.log('Server started at PORT 3001');
})