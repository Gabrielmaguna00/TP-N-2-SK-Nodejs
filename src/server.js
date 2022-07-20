const express = require("express")
const app=express()
const morgan = require("morgan")
const productosRoute = require('./Routes/productos')
const path = require("path")

app.set("port", process.env.PORT||3000)
app.use(morgan("tiny"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Rutas
app.use('/productos', productosRoute)
// Motor de plantillas
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")
app.use(express.static("./views"))

app.get("/", (req, res) => {
	res.render("index.pug")
})
app.listen(app.get("port"), ()=>{
    console.log("Servidor en el puerto 3000"), app.get("port")
})
