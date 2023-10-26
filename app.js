 let express= require('express');
 let mysql = require('mysql')

 let app = express();
 app.listen('3306',function(){
    console.log('servidor OK', 3306); 
 })

 app.get('/',function(req,res){
    res.send('Ruta INICIO');
 })

 let conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'articulosdb'
 });

 conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conexion exitosa');
    }
 });

 app.get('/api/articulos', (req,res)=>{
    conexion.query('SELECT * FROM articulos', (error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
 });

 app.get('/api/articulos/:id', (req,res)=>{
    conexion.query('SELECT * FROM articulos WHERE id=?',[req.params.id], (error,fila)=>{
        if (error){
            throw error;
        }else{
            res.send(fila);
            res.send(fila[0].descripcion);
        }
    });
 });