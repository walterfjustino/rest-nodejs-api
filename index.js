/*subir o servidor no ar*/

const customExpress = require('./config/customExpress')

const conection = require('./infraestructure/conection')

const Tables = require('./infraestructure/tables')

conection.connect(erro => {
    if (erro) {
        console.log(erro)
    } else {
        console.log('conectado com sucesso')

        Tables.init(conection) /*Inicializando a conexão das Tabelas com o Banco de dados */
        const app = customExpress()

        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
    }

})



