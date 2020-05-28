const express = require('express')
const consign = require('consign')

const app = express()

consign().include('routes').into(app)

// app.use(routesIndex)
// app.use('/users', routesUsers)



app.listen(3000, '127.0.0.1', () => {
    console.log('Servidor rodando...')
})