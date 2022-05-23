const express       = require('express')
const bodyParser    = require('body-parser')
const path          = require('path')

const router = express.Router()
const app = express()

const port = process.env.PORT || 1337

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: "application/vnd.api+json" }))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'src')))

require('./src/routing/api')(app)
require('./src/routing/wallet')(app)
require('./src/routing/tx')(app)

app.listen(port, () => {
    console.log(`App listening on port: http://localhost:${port}`)
})