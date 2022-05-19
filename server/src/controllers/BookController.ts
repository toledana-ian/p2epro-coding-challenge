import {Handler, Request, Response} from 'express';

export const getBooks:Handler = (req:Request, res:Response)=>{
    res.send('Hello from router');
}