const express = require('express')
const router = express.Router()

const personList = require('../personList')

router.get('/', (request, response) => {
    response.send(`puhelinluettelossa ${personList.length} henkilön tiedot.<br/>${new Date().toString()}`)
})

module.exports = router
