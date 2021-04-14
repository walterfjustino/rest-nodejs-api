const Pet = require('../models/pets')

module.exports = app => {

    /*METODO POST - CRIA UM PET */
    app.post('/pet', (req, res) => {
        const pet = req.body

        Pet.adiciona(pet, res)
    })
}