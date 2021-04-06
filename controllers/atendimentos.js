/*Rotas atendimento */

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos, e esta realizando um GET'))

    app.post('/atendimentos', (req, res) => res.send('Você está na rota de atendimento, e esta realizando um POST!'))

}