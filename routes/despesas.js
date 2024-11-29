const express = require('express');
const router = express.Router();
const Despesa = require('../models/despesas'); // Importa a model de despesas

// Rota para listar as despesas do mês atual (GET /api/despesas)
router.get('/', async (req, res) => {
  try {
    const despesas = await Despesa.listar();
    res.json({ data: despesas, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: null, success: false, message: 'Erro ao listar as despesas.' });
  }
});

// Rota para cadastrar uma nova despesa (POST /api/despesas)
router.post('/', async (req, res) => {
  const { valor, data_compra, descricao, tipo_pagamento, categoria_id } = req.body;

  if (!valor || !data_compra || !descricao || !tipo_pagamento || !categoria_id) {
    return res.status(400).json({ data: null, success: false, message: 'Campos obrigatórios não informados.' });
  }

  try {
    const id = await Despesa.cadastrar({ valor, data_compra, descricao, tipo_pagamento, categoria_id });
    res.status(201).json({ data: { id }, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: null, success: false, message: 'Erro ao cadastrar despesa.' });
  }
});

// Atualiza uma despesa
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { valor, data_compra, descricao, tipo_pagamento, categoria_id } = req.body;
  
    if (!valor || !data_compra || !descricao || !tipo_pagamento || !categoria_id) {
      return res.status(400).json({ data: null, success: false, message: 'Campos obrigatórios não informados.' });
    }
  
    try {
      const result = await Despesa.atualizar(id, { valor, data_compra, descricao, tipo_pagamento, categoria_id });
      if (result === 0) {
        return res.status(404).json({ data: null, success: false, message: 'Despesa não encontrada.' });
      }
      res.status(200).json({ data: { id }, success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ data: null, success: false, message: 'Erro ao atualizar despesa.' });
    }
  });
  
// Deleta uma despesa
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await Despesa.deletar(id);
      if (result === 0) {
        return res.status(404).json({ data: null, success: false, message: 'Despesa não encontrada.' });
      }
      res.status(200).json({ data: null, success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ data: null, success: false, message: 'Erro ao deletar despesa.' });
    }
  });

  // Rota para listar uma despesa específica (GET /api/despesas/:id)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const despesa = await Despesa.listarPorId(id);

    if (!despesa) {
      return res.status(404).json({ data: null, success: false, message: 'Despesa não encontrada.' });
    }

    res.json({ data: despesa, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: null, success: false, message: 'Erro ao buscar a despesa.' });
  }
});

// Rota para listar as categorias (GET /api/categorias)
router.get('/categorias', async (req, res) => {
  try {
    const categorias = await Despesa.listarCategorias();
    res.json({ data: categorias, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: null, success: false, message: 'Erro ao listar categorias.' });
  }
});

// Rota para criar uma nova categoria (POST /api/categorias)
router.post('/categorias', async (req, res) => {
  const { nome, descricao } = req.body;

  if (!nome || !descricao) {
    return res.status(400).json({ data: null, success: false, message: 'Campos obrigatórios não informados.' });
  }

  try {
    const id = await Despesa.criarCategoria({ nome, descricao });
    res.status(201).json({ data: { id }, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: null, success: false, message: 'Erro ao criar categoria.' });
  }
});

// Rota para deletar uma categoria (DELETE /api/categorias/:id)
router.delete('/categorias/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Despesa.deletarCategoria(id);
    if (result === 0) {
      return res.status(404).json({ data: null, success: false, message: 'Categoria não encontrada.' });
    }
    res.status(200).json({ data: null, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: null, success: false, message: 'Erro ao deletar categoria.' });
  }
});

  
module.exports = router;