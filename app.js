const express = require('express');
const bodyParser = require('body-parser');
const despesasRoutes = require('./routes/despesas');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(despesasRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
