const express = require('express')
const router = express.Router()

const personList = require('../personList')

router.get('/:id', (request, response) => {
    const person = personList.find((p) => p.id.toString() === request.params.id.toString())
    if (!person) {
        return response.status(404).end()
    }
    response.json(person)
})

router.delete('/:id', (request, response) => {
    const index = personList.indexOf(personList.find(l => l.id.toString() === request.params.id.toString()))
    if (index < 0) {
        return response.status(404).end()
    }
    personList.splice(index, 1)
    return response.status(200).end()
})

router.get('/', (request, response) => {
  response.json(personList)
})

router.post('/', (request, response) => {
    const person = request.body
    if (!person.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    } 
    if (!person.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    if (personList.find(p => p.name === person.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    personList.push(Object.assign({}, person, {
        id: Math.floor(Math.random() * 1000000000)
    }))
    response.status(200).end()
})

module.exports = router
