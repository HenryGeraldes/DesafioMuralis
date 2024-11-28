const db = require('../db/database');

class Despesa {
  static listar(callback) {
    const hoje = new Date();
    const mesAtual = `${hoje.getFullYear()}-${(hoje.getMonth() + 1).toString().padStart(2, '0')}`;
    const query = `SELECT * FROM despesas WHERE data_compra LIKE '${mesAtual}%'`;

    db.all(query, [], (err, rows) => {
      callback(err, rows);
    });
  }

  static cadastrar(despesa, callback) {
    const query = `INSERT INTO despesas (valor, data_compra, descricao, tipo_pagamento, categoria_id) 
                   VALUES (?, ?, ?, ?, ?)`;
    const params = [
      despesa.valor,
      despesa.data_compra,
      despesa.descricao,
      despesa.tipo_pagamento,
      despesa.categoria_id,
    ];

    db.run(query, params, function (err) {
      callback(err, this.lastID);
    });
  }
}

module.exports = Despesa;
