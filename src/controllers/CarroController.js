const CarroService = require('../services/CarroService')

// Tudo que for regra do banco de dados vai ser usado aqui.


module.exports = {
  buscarTodos: async (req, res) => {
    let json = { error: '', result: [] }
    let carros = await CarroService.buscarTodos()
    for (let i in carros) {
      json.result.push({
        codigo: carros[i].codigo,
        descricao: carros[i].modelo,
      })
    }
    res.json(json)
  },

  buscarUm: async (req, res) => {
    let json = { error: '', result: {} };
    let codigo = req.params.codigo; //para pegar o parametro
    let carro = await CarroService.buscarUm(codigo);
    if (carro) {
      json.result = carro;
    }
    res.json(json);
  },

  inserir: async (req, res) => {
    let json = { error: '', result: {} }
    let modelo = req.body.modelo
    let placa = req.body.placa
    if (modelo && placa) {
      let CarroCodigo = await CarroService.inserir(modelo, placa)
      json.result = {
        codigo: CarroCodigo,
        modelo,
        placa,
      }
    } else {
      json.error = 'Campos não enviados.'
    }
    res.json(json)
  },

  alterar: async (req, res) => {
    let json = { error: '', result: {} }
    let codigo = req.params.codigo
    let modelo = req.body.modelo
    let placa = req.body.placa
    if (codigo && modelo && placa) {
      await CarroService.alterar(codigo, modelo, placa)
      json.result = {
        codigo,
        modelo,
        placa
      }
    } else {
      json.error = 'Campos não enviados'
    }
    res.json(json)
  },

  excluir: async (req, res) => {
    let json = { error: '', result: {} }
    let codigo = req.params.codigo
    if (codigo) {
      await CarroService.excluir(codigo)
      json.result = {
        codigo
      }
    } else {
      json.error = 'Precisa enviar um código válido para excluir'
    }
    res.json(json)
  }
}