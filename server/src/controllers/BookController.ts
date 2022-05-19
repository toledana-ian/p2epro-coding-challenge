import {Handler, Request, Response} from 'express';
import {createConnection, getConnection} from '../db'

export const getBooks:Handler = (req:Request, res:Response)=>{
    const data = getConnection().get('books').value();
    return res.json(data);
    // res.send(getConnection().data?.books);s
}