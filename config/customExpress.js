/*configurar o qualquer coisa dentro do express*/

const express = require('express')

const consign = require('consign')

    module.exports = () => {
        const app = express() //cria a variavel app

        consign()           //configura a variavel app
            .include('controllers')
            .into(app)

            return app
    }