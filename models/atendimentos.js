const moment = require('moment')
const axios = require('axios')
const conection = require('../infraestructure/conection')


class Atendimento {

    /*METODO -> POST - CRIA UM ATENDIMENTO*/
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        
        /*FAZ A CONVERSÃO DO PADRÃO DE DATA INFORMADO PELO USUÁRIO PARA O QUE VAI SER SALVO NO BANCO DE DADOS */
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS') 

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao) /*RETORNA UM TRUE OU FALSE */

        const clienteEhValido = atendimento.cliente.length >= 3 /*RETORNA UM TRUE OU FALSE */

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
                mensagem:'Cliente deve ter pelo menos 3 caracteres'
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

    /*METODO -> GET - LISTA TODOS ATENDIMENTOS */
    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'

        conection.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })

    }

    /*METODO -> GET - LISTA APENAS 1 ATENDIMENTO PESQUISADO POR ID */
    buscaPorId(id, res) {

        /*QUERY UTILIZADO [``] CRASE EM VEZ DE ASPAS SIMPLES, POIS ESTÁ PASSANDO O PARAMETRO DO ID NA CLAUSULA WHERE */
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;
    
        conection.query(sql, async (erro, resultados) => {
            const atendimento = resultados[0]
            const cpf = atendimento.cliente
            if (erro) {
                res.status(400).json(erro)
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = data
                res.status(200).json(atendimento)                
            }
        })
    }

    /*METODO -> PATCH - ALTERA UM CAMPO DESEJADO PELO USUARIO DO ATENDIMENTO */
    altera(id, valores, res) {
        if (valores.data) {
             /*FAZ A CONVERSÃO DO PADRÃO DE DATA INFORMADO PELO USUÁRIO PARA O QUE VAI SER SALVO NO BANCO DE DADOS */
             valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS') 
        }    
    /*ALTERA OS VALORES NA TABELA ATENDIMENTO ?[significa que será os valores informados pelo usuario] */
        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?' 

        conection.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }

        })

    }

    /*METODO -> DELETE - EXCLUI UM ATENDIMENTO DESEJADO */
    deleta(id, res){
       const sql = 'DELETE FROM Atendimentos WHERE id = ?'

       conection.query(sql, id, (erro, resultados) => {
           if (erro) {
               res.status(400).json(erro)
           } else {
               res.status(200).json({id})
           }

       })
    }
}

module.exports = new Atendimento()