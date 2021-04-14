/*CRIANDO AS TABELAS AUTOMATICAMENTE */


class Tables{
    init(conection){ /*START DA CONEXAO DO BANCO DE DADOS COM AS TABELAS */
        this.conection = conection

        this.createAtendimentos() /*START DA CRIAÇÃO DA TABELA ATENDIMENTOS*/
        this.createPets() /*START DA CRIAÇÃO DA TABELA PETS*/
    }

    /*QUERY PARA CRIAR A TABELA ATENDIMENTOS */
    createAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'

        this.conection.query(sql, (erro) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Table Atendimentos created with sucessful')
            }

        })
    }

    /*QUERY PARA CRIAR A TABELA Pets, ONDE IRA ARMAZENAR AS IMAGENS DOS PETS */
    createPets() {
        const query = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome varchar(50), imagem varchar(200), PRIMARY KEY (id))'

        this.conection.query(query, (erro) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Table Pets created with sucessful  ')
            }
        })

    }
}

module.exports = new Tables()