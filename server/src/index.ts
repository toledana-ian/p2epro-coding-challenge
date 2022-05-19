import app from './app';

app.listen(app.get('port'), ()=>{
    console.log('Server started at PORT 3001');
})