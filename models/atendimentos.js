const conection = require('../infraestructure/conection')


class Atendimento {
    adiciona(atendimento){
        const sql = 'INSERT INTO Atendimentos SET ?' /* ? = SIGNIFICA QUE IRÁ SER INSERIDO QUALQUER OBJETO NA TABELA ATENDIMENTOS*/

        conection.query(sql, atendimento, (erro, resultados) => { /* dentro de QUERY pode ser passado varios parametros */
            if(erro){
                console.log(erro)
            } else{
                console.log(resultados)
            }

        })

    }
}

module.exports = new Atendimento