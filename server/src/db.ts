import lowdb from "lowdb";
import fs from "fs";
import {join} from 'path';
import BookModel from "./models/BookModel";

type BooksModel = {
    books: BookModel[];
}

let db: lowdb.Low<BooksModel>;

export const createConnection = async () => {
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

    const adapter = new lowdb.JSONFile<BooksModel>(getFileLoc());
    db = new lowdb.Low<BooksModel>(adapter);
    await db.read();

    db.data ||= {
        books: []
    };
}

export const getConnection = () => db;