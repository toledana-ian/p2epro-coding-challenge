import lowdb from 'lowdb';
import fs from "fs";
import {join} from 'path';

const getFileLoc = ()=>{
    const file = join(__dirname,'..','db.json');

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

    return file;
}

export const createConnection = () => {
    const adapater = new lowdb.JSONFileSync(getFileLoc());
    lowdb(adapater);
}