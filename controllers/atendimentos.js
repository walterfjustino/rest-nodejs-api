/*Rotas atendimento */

const atendimentos = require('../models/atendimentos')
const Atendimento = require('../models/atendimentos')


module.exports = app => {
    /*METODO GET - RETORNA LISTA DE ATENDIMENTOS*/
    app.get('/atendimentos', (req, res) => {

        Atendimento.lista(res)

    })

    /*METODO GET - RETORNA APENAS UM ATENDIMENTO (id) PASSANDO O PARAMETRO :id */
    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id) /*Converte id de String para Inteiro para salvar no Banco de dados*/

        Atendimento.buscaPorId(id, res)

    })

    /*METODO POST - CRIA UM ATENDIMENTO */
    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento, res)
            
        })

    /*METODO PATCH - ALTERA APENAS UM DETERMINADO CAMPO INFORMADO*/
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id) /*Converte id de String para Inteiro para salvar no Banco de dados*/
        const valores = req.body

        Atendimento.altera(id, valores, res)
    })

    /*METODO DELETE - EXCLUI UM ATENDIMENTO PASSANDO O ID */
    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id) /*Converte id de String para Inteiro para salvar no Banco de dados*/

        Atendimento.deleta(id, res)
    })


}