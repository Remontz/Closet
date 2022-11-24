const ClosetController = require('../controllers/closet.controller')


const routes = (app) => {
    //C
    app.post('/api/closet', ClosetController.create)

    //R
    app.get('/api/closet', ClosetController.getAll)
    app.get('/api/closet/:id', ClosetController.getOne)

    //U
    app.put('/api/closet/:id', ClosetController.update)

    //D
    app.delete('/api/closet/:id', ClosetController.delete)
}

module.exports = routes