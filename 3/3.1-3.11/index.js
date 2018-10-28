const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

const persons = require('./routes/persons')
const info = require('./routes/info')

app.use(express.static('build'))
app.use(bodyParser.json())
morgan.token('data', function (req, res) { 
    return JSON.stringify(req.body || {})
})
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))

app.use('/api/persons', persons)

app.use('/info', info)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
