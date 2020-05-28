
module.exports = app => {

    app.get('/users', (req, res) => {
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

    app.get('/users/admin', (req, res) => {
        res.statusCode = 200
        res.setHeader('content-Type', 'application/json')
        res.json({
            users: []
        })
    })
}
