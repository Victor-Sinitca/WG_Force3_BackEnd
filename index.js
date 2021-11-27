require("dotenv").config()
const express = require("express")
const router = require(`./router/index`)
const documentation = require(`./helper/documentation`)
const cors = require('cors')

const errorMiddleware = require(`./middlewares/error-middleware`)


const PORT = process.env.PORT || 8000
const app = express()
app.use(express.json())

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}))

app.use(`/api`, router)


app.use(`/doc`,documentation)
app.use(errorMiddleware) // !!должен быть последним middleware


const start = async () => {
    try {
        app.listen(PORT, () => console.log(`server was start on   http://localhost:${PORT}/  documentation http://localhost:${PORT}/doc `))
    } catch (e) {
        console.log(e)
    }
}

start()
