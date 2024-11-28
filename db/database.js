const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'despesas.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS despesas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    valor REAL NOT NULL,
    data_compra TEXT NOT NULL,
    descricao TEXT NOT NULL,
    tipo_pagamento INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tipos_pagamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL
  )`);

  // Inserindo valores padrão em tipos_pagamento
  db.run(`INSERT OR IGNORE INTO tipos_pagamento (id, tipo) VALUES 
    (1, 'Dinheiro'), (2, 'Débito'), (3, 'Crédito'), (4, 'PIX')`);
});

module.exports = db;
