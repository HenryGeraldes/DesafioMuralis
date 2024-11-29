const db = require('../db/database'); // Conexão com o banco de dados SQLite

class Despesa {
  // Método para cadastrar uma nova despesa
  static cadastrar({ valor, data_compra, descricao, tipo_pagamento, categoria_id }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO despesas (valor, data_compra, descricao, tipo_pagamento, categoria_id)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.run(sql, [valor, data_compra, descricao, tipo_pagamento, categoria_id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID); // Retorna o ID da despesa recém inserida
      });
    });
  }

  // Método para listar as despesas do mês atual
  static listar() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM despesas 
      `;
      db.all(sql, [], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows); // Retorna todas as despesas do mês atual
      });
    });
  }

// Atualiza uma despesa
static atualizar(id, { valor, data_compra, descricao, tipo_pagamento, categoria_id }) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE despesas
        SET valor = ?, data_compra = ?, descricao = ?, tipo_pagamento = ?, categoria_id = ?
        WHERE id = ?
      `;
  
      db.run(sql, [valor, data_compra, descricao, tipo_pagamento, categoria_id, id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes); // Retorna o número de linhas afetadas
      });
    });
  }
  
 // Deleta uma despesa
static deletar(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM despesas WHERE id = ?`;
  
      db.run(sql, [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes); // Retorna o número de linhas afetadas
      });
    });
  }
  static listarPorId(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM despesas WHERE id = ?`;
      db.get(sql, [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row); // Retorna a despesa encontrada ou `undefined` se não existir
      });
    });
  }
   
}

module.exports = Despesa;