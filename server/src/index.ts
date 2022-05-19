import app from './app';
import { createConnection } from "./db";

createConnection();

app.listen(app.get('port'), ()=>{
    console.log('Server started at PORT 3001');
})