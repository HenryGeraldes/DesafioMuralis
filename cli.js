const readline = require('readline');
const Despesa = require('./models/despesas'); // Importa a model de despesas

// Configuração do readline para receber inputs do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const menu = `
Escolha uma operação:
1 - Listar despesas (GET)
2 - Cadastrar despesa (POST)
3 - Atualizar despesa (PUT)
4 - Deletar despesa (DELETE)
5 - Sair
> `;

// Função para exibir o menu principal
function mostrarMenu() {
  rl.question(menu, async (escolha) => {
    switch (escolha.trim()) {
      case '1': // GET
        await listarDespesas();
        break;
      case '2': // POST
        await cadastrarDespesa();
        break;
      case '3': // PUT
        await atualizarDespesa();
        break;
      case '4': // DELETE
        await deletarDespesa();
        break;
      case '5': // Sair
        rl.close();
        return;
      default:
        console.log('Escolha inválida. Tente novamente.');
    }
    mostrarMenu();
  });
}

// Função para listar despesas (GET)
async function listarDespesas() {
  try {
    const despesas = await Despesa.listar();
    console.log('\n=== Despesas do Mês Atual ===');
    despesas.forEach((despesa) => {
      console.log(
        `ID: ${despesa.id}, Valor: R$${despesa.valor}, Data: ${despesa.data_compra}, Descrição: ${despesa.descricao}, Tipo Pagamento: ${despesa.tipo_pagamento}, Categoria ID: ${despesa.categoria_id}`
      );
    });
    console.log('==============================\n');
  } catch (err) {
    console.error('Erro ao listar despesas:', err.message);
  }
}

// Função para cadastrar uma despesa (POST)
async function cadastrarDespesa() {
  rl.question('Valor da despesa: ', (valor) => {
    rl.question('Data da compra (YYYY-MM-DD): ', (data_compra) => {
      rl.question('Descrição: ', (descricao) => {
        rl.question('Tipo de pagamento (1-Dinheiro, 2-Débito, 3-Crédito, 4-PIX): ', (tipo_pagamento) => {
          rl.question('ID da categoria: ', async (categoria_id) => {
            try {
              const id = await Despesa.cadastrar({
                valor: parseFloat(valor),
                data_compra,
                descricao,
                tipo_pagamento: parseInt(tipo_pagamento),
                categoria_id: parseInt(categoria_id),
              });
              console.log(`Despesa cadastrada com sucesso! ID: ${id}`);
            } catch (err) {
              console.error('Erro ao cadastrar despesa:', err.message);
            }
            mostrarMenu();
          });
        });
      });
    });
  });
}

// Função para atualizar uma despesa (PUT)
async function atualizarDespesa() {
  rl.question('ID da despesa a ser atualizada: ', (id) => {
    rl.question('Novo valor da despesa: ', (valor) => {
      rl.question('Nova data da compra (YYYY-MM-DD): ', (data_compra) => {
        rl.question('Nova descrição: ', (descricao) => {
          rl.question('Novo tipo de pagamento (1-Dinheiro, 2-Débito, 3-Crédito, 4-PIX): ', (tipo_pagamento) => {
            rl.question('Novo ID da categoria: ', async (categoria_id) => {
              try {
                const resultado = await Despesa.atualizar(parseInt(id), {
                  valor: parseFloat(valor),
                  data_compra,
                  descricao,
                  tipo_pagamento: parseInt(tipo_pagamento),
                  categoria_id: parseInt(categoria_id),
                });
                if (resultado) {
                  console.log('Despesa atualizada com sucesso!');
                } else {
                  console.log('Despesa não encontrada.');
                }
              } catch (err) {
                console.error('Erro ao atualizar despesa:', err.message);
              }
              mostrarMenu();
            });
          });
        });
      });
    });
  });
}

// Função para deletar uma despesa (DELETE)
async function deletarDespesa() {
  rl.question('ID da despesa a ser deletada: ', async (id) => {
    try {
      const resultado = await Despesa.deletar(parseInt(id));
      if (resultado) {
        console.log('Despesa deletada com sucesso!');
      } else {
        console.log('Despesa não encontrada.');
      }
    } catch (err) {
      console.error('Erro ao deletar despesa:', err.message);
    }
    mostrarMenu();
  });
}

// Inicializa o script
console.log('Bem-vindo ao sistema de gerenciamento de despesas!');
mostrarMenu();
