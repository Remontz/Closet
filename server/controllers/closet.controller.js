const Closet = require('../models/closet.model')

const ClosetController = {
    //C
    create: (req, res) => {
        Closet
            .create(req.body)
            .then((result) => {
                res.status(201).json(result)
            })
            .catch((err) => {
                res.status(404).json({ msg: 'Error encountered when creating closet', error: err })
            })
    },
    //R
    getAll: (req, res) => {
        Closet
            .find({})
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                res.status(404).json({ msg: 'Error encountered when creating closet', error: err })
            })
    },
    getOne: (req, res) => {
        Closet
            .findOne({ _id: req.params.id })
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                res.status(404).json({ msg: 'Error encountered when creating closet', error: err })
            })
    },
    getAllShirts: (req, res) => {
        Closet
            .findOne({ _id: req.params.id })
            .then((result) => {
                res.json(result.shirts)
            })
            .catch((err) => {
                res.status(404).json({ msg: 'Error encountered when gathering all shirts', error: err })
            })
    },

    //U
    update: (req, res) => {
        Closet
            .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                res.status(404).json({ msg: 'Error encountered when creating closet', error: err })
            })
    },

    //D
    delete: (req, res) => {
        Closet
            .findOneAndDelete({ _id: req.params.id })
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                res.status(404).json({ msg: 'Error encountered when creating closet', error: err })
            })
    }
}

module.exports = ClosetController