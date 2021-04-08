const moment = require('moment')

const conection = require('../infraestructure/conection')


class Atendimento {
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao) /*RETORNA UM TRUE OU FALSE */

        const clienteEhValido = atendimento.cliente.length >= 5 /*RETORNA UM TRUE OU FALSE */

        /* FUNÇÃO DE ARRAY QUE RETORNA AS VALIDAÇÕES DE ERRO TRATADAS */
        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome:'cliente',
                valido: clienteEhValido,
                mensagem:'Cliente deve ter pelo menos 5 caracteres'
            }
        ]

        /* RETORNA O ERRO SE VERIFICADO QUE NÃO FOR VALIDO A INFORMAÇÃO NO CAMPO, E SALVA DENTRO DOS ERROS */
        const erros = validacoes.filter(campo => !campo.valido)

        /*SE ERROS.LENGTH FOR = 0 É FALSE */
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {

        const atendimentoDatado = {...atendimento, dataCriacao, data}
        
        const sql = 'INSERT INTO Atendimentos SET ?' /* ? = SIGNIFICA QUE IRÁ SER INSERIDO QUALQUER OBJETO NA TABELA ATENDIMENTOS*/

        conection.query(sql, atendimentoDatado, (erro, resultados) => { /* dentro de QUERY pode ser passado varios parametros */
            if(erro){
                res.status(400).json(erro)
            } else{
                res.status(201).json(atendimento)
            }

        })
     }
     
    }
}

module.exports = new Atendimento