
const conection = require('../infraestructure/conection')
const uploadFiles = require('../files/uploadFiles')

class Pet {
    adiciona(pet, res) {
        const query = 'INSERT INTO Pets SET ?'

        uploadFiles(pet.imagem, pet.nome, (erro, novoCaminho) => {  /*1º PARAMETRO = RECEBE A IMAGEM, 2º PARAMETRO = NOMEDOARQUIVO(NO CASO NOME DO PET) 3º FUNÇAO DE CALLBACK(RECEBE O NOVO CAMINHO) */
            if (erro) {
                res.status(400).json({ erro })
            } else {
                const novoPet = { nome: pet.nome, imagem: novoCaminho }

                conection.query(query, novoPet, erro => {
                    if (erro) {
                        console.log(erro)
                        res.status(400).json(erro)
                    } else {
                        res.status(201).json(novoPet)
                    }
                })
            }
        })
    }
}

module.exports = new Pet()