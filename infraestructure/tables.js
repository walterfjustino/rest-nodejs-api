/*CRIANDO AS TABELAS AUTOMATICAMENTE */

const { query } = require("express")

class Tables{
    init(conection){ /*START DA CONEXAO DO BANCO DE DADOS COM AS TABELAS */
        this.conection = conection

        this.createAtendimentos() /*START DA CRIAÇÃO DA TABELA ATENDIMENTOS*/
    }

    /*QUERY PARA CRIAR A TABELA ATENDIMENTOS */
    createAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'


        this.conection.query(sql, (erro) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Table Atendimentos created with sucessful')
            }

        })
    }
}

module.exports = new Tables