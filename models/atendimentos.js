const moment = require('moment')

const conection = require('../infraestructure/conection')


class Atendimento {
    adiciona(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const atendimentoDatado = {...atendimento, dataCriacao, data}
        
        const sql = 'INSERT INTO Atendimentos SET ?' /* ? = SIGNIFICA QUE IRÁ SER INSERIDO QUALQUER OBJETO NA TABELA ATENDIMENTOS*/

        conection.query(sql, atendimentoDatado, (erro, resultados) => { /* dentro de QUERY pode ser passado varios parametros */
            if(erro){
                console.log(erro)
            } else{
                console.log(resultados)
            }

        })

    }
}

module.exports = new Atendimento