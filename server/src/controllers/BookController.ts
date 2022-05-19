import {Handler, Request, Response} from 'express';
import {createConnection, getConnection} from '../db';
import { nanoid } from 'nanoid'
import BookModel from "../models/BookModel";

export const getBooks:Handler = (req:Request, res:Response)=>{
    const data = getConnection().get('books').value();
    return res.json(data);
}

export const addBook: Handler = (req:Request, res:Response) => {
    const { title, author } = req.body;

    const newBook:BookModel = { title, author, id: nanoid() };

    try {
        getConnection().get('books').push(newBook).write();
        res.json(newBook);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteBook: Handler = (req:Request, res:Response) => {
    const bookFound = getConnection()
        .get('books')
        .find({ id: req.params.id })
        .value();

    if (!bookFound) {
        return res.status(404).json({ msg: "Book was not found" });
    }

    const deletedBook = getConnection()
        .get('books')
        .remove({ id: req.params.id })
        .write();

    res.json(deletedBook);
};