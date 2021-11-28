require("dotenv").config()
const express = require("express")
const router = require(`./router/index`)
const documentation = require(`./helper/documentation`)
const cors = require('cors')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler');

const mongoose = require('mongoose');
mongoose.promise = global.Promise;

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
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(`/api`, router)


app.use(`/doc`, documentation)

const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    app.use(errorHandler());

}
app.use(errorMiddleware) // !!должен быть последним middleware


const start = async () => {
    try {
        //Configure Mongoose
        await mongoose.connect(process.env.BD_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            user:"root",
            pass:"1986"
        },function(error) {
            if(error) console.log(`error  mongoose.connect : ${error}`)
        });
        await  mongoose.set('debug', true);
        app.listen(PORT, () => console.log(`server was start on   http://localhost:${PORT}/  documentation http://localhost:${PORT}/doc `))
    } catch (e) {
        console.log(e)
    }
}

start()
