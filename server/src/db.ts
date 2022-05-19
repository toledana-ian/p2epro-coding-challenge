import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import fs from "fs";
import {join} from 'path';
import BookModel from "./models/BookModel";

type BooksModel = {
    books: BookModel[];
}

let db: lowdb.LowdbSync<BooksModel>;

export const createConnection = () => {
    const getFileLoc = () => {
        const file = join(__dirname, '..', 'db.json');

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

    const adapter = new FileSync<BooksModel>(getFileLoc());
    db = lowdb(adapter);
    db.defaults({ books: [] }).write();
}

export const getConnection = () => db;