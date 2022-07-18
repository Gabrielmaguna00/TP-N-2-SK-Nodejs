const express = require("express")
const mysql= require('mysql')
const app=express()
const morgan = require("morgan")

app.set("port", process.env.PORT||3000)
app.use(morgan("tiny"))
app.use(express.json())

app.listen(app.get("port"), ()=>{
    console.log("Servidor en el puerto 3000"), app.get("port")
})