const express = require('express');
const router = express.Router();
const Despesa = require('../models/despesas');

// Listar despesas
router.get('/api/despesas', (req, res) => {
  Despesa.listar((err, despesas) => {
    if (err) {
      return res.status(500).json({ data: null, success: false });
    }
    res.json({ data: despesas, success: true });
  });
});

// Cadastrar despesa
router.post('/api/despesas', (req, res) => {
  const { valor, data_compra, descricao, tipo_pagamento, categoria_id } = req.body;

  if (!valor || !data_compra || !descricao || !tipo_pagamento || !categoria_id) {
    return res.status(400).json({ data: null, success: false });
  }

  const novaDespesa = { valor, data_compra, descricao, tipo_pagamento, categoria_id };

  Despesa.cadastrar(novaDespesa, (err, id) => {
    if (err) {
      return res.status(500).json({ data: null, success: false });
    }
    res.json({ data: id, success: true });
  });
});

module.exports = router;
