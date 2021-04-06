/*configurar qualquer coisa dentro do express*/

const express = require('express')

const consign = require('consign')

const bodyParser = require('body-parser')

    module.exports = () => {
        const app = express() //cria a variavel app

        /*adicionando bibliotecas*/
        /*UTILIZADO PARA RECEBER DADOS VIA FORMULARIO DE BROWSERS */
        app.use(bodyParser.urlencoded({extended: true})) ;
       /*UTILIZADO PARA RECEBER DADOS VIA JSON */
        app.use(bodyParser.json())     

        consign()           //configura a variavel app
            .include('controllers')
            .into(app)

            return app
    }