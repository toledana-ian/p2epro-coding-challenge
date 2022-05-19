import {Handler, Request, Response} from 'express';
import {createConnection, getConnection} from '../db'

export const getBooks:Handler = (req:Request, res:Response)=>{
    createConnection();
    res.send(getConnection().data?.books);
}