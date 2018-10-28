const mongoose = require('mongoose')

const username = process.env.USERNAME
const password = process.env.PASSWORD

const url = `mongodb://${username}:${password}@ds055709.mlab.com:55709/fullstack-open`

mongoose.connect(url)

const Contact = mongoose.model('Contact', {
    name: String,
    number: String,
})

const name = process.argv[2]
const number = process.argv[3]

const contact = new Contact({
    name,
    number,
})

contact
    .save()
    .then(() => {
        console.log(`lisätään henkilö ${name} numero ${number} luetteloon`)
        mongoose.connection.close()
    })