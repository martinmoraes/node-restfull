const { check, validationResult } = require("express-validator")
const NeDB = require('nedb')
const db = new NeDB({
    filename: 'users.db',
    autoload: true
})

module.exports = app => {

    const route = app.route('/users')

    route.get((req, res) => {

        db.find({}).sort({ name: 1 }).exec((err, users) => {
            if (err) {
                app.utils.error.send(err, req, res)
            } else {
                res.statusCode = 200
                res.setHeader('content-Type', 'application/json')
                res.json({
                    users
                })
            }
        })

    })

    app.get('/users/admin', (req, res) => {
        res.statusCode = 200
        res.setHeader('content-Type', 'application/json')
        res.json({
            users: []
        })
    })

    route.post([
        check("name", "O nome é obrigatório.").notEmpty(),
        check("email", "Email inválido.").isEmail(),
    ], (req, res) => {

        const errors = validationResult(req)
        console.log('Errors: ', errors)
        if (!errors.isEmpty()) {
            app.utils.error.send(errors, req, res)
            return false
        }

        db.insert(req.body, (err, user) => {
            if (err) {
                app.utils.error.send(err, req, res)
            } else {
                res.status(200).json(user)
            }
        })
    })


    const routeId = app.route('/users/:id')

    routeId.get((req, res) => {
        db.findOne({ _id: req.params.id }).exec((err, user) => {
            if (err) {
                app.utils.error.send(err, req, res)
            } else {
                res.status(200).json(user)
            }
        })
    })

    routeId.put((req, res) => {
        db.update({ _id: req.params.id }, req.body, err => {
            if (err) {
                app.utils.error.send(err, req, res)
            } else {
                res.status(200).json(Object.assign(req.params, req.body))
            }
        })
    })

    routeId.delete((req, res) => {
        db.remove({ _id: req.params.id }, {}, err => {
            if (err) {
                app.utils.error.send(err, req, res)
            } else {
                res.status(200).json(req.params)
            }
        })
    })


    route.delete((req, res) => {
        res.json(req.body)
    })
}
