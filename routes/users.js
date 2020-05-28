const express = require('express')

const routes = express.Router()


routes.get('/', (req, res) => {
    res.statusCode = 200
    res.setHeader('content-Type', 'application/json')
    res.json({
        users: [{
            name: 'João',
            email: 'joao@qweert.vb',
            id: 1
        }]
    })
})

routes.get('/admin', (req, res) => {
    res.statusCode = 200
    res.setHeader('content-Type', 'application/json')
    res.json({
        users: []
    })
})

module.exports = routes