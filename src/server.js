const express = require("express")
const mysql= require('mysql')
const app=express()
const morgan = require("morgan")
const productosRoute = require('./Routes/productos')

app.set("port", process.env.PORT||3000)
app.use(morgan("tiny"))
app.use(express.json())

app.use('/productos', productosRoute)

app.listen(app.get("port"), ()=>{
    console.log("Servidor en el puerto 3000"), app.get("port")
})