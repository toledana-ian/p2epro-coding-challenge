import express, {Application, Request, Response} from 'express';
import fs from 'fs';

const app:Application = express();

const file = __dirname+'/../db.json';

//Create db.json if not exists
fs.open(file, 'r', (err, fd) => {
    if (err) {
        if (err.code === 'ENOENT') {
            fs.appendFile(file, '', function (err) {
                if (err) throw err;
                console.log('Created db.json!');
            });
            return;
        }
        throw err;
    }
    fs.close(fd);
});

app.get('/', (req:Request, res:Response)=>{
    res.send('Hello');
});

app.listen(3001, ()=>{
    console.log('Server started at PORT 3001');
})