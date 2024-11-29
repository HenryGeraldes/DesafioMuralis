const readline = require('readline');
const Despesa = require('./models/despesas'); // Importa a model de despesas

// Configuração do readline para receber os inputs do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const menu = `
*******************************************
*    Escolha uma operação:                *
*    1 - Listar despesas (GET)            *
*    2 - Cadastrar despesa (POST)         *
*    3 - Atualizar despesa (PUT)          *
*    4 - Deletar despesa (DELETE)         *
*    5 - Listar despesa por ID (GETbyID)  *
*    6 - Listar categorias (GET)          *
*    7 - Criar categoria (POST)           *
*    8 - Deletar categoria (DELETE)       *
*    9 - Sair                             *
*******************************************
> `;


// Função para criar uma categoria (POST)
async function criarCategoria() {
    rl.question('Nome da categoria: ', (nome) => {
      rl.question('Descrição da categoria: ', async (descricao) => {
        try {
          const id = await Despesa.criarCategoria({ nome, descricao });
          console.log(`Categoria criada com sucesso! ID: ${id}`);
          mostrarMenu();
        } catch (err) {
          console.error('Erro ao criar categoria', err.message);
        }
      });
    });
  }
  
// Função para deletar uma categoria (DELETE)
  async function deletarCategoria() {
    rl.question('ID da categoria a ser deletada: ', async (id) => {
      try {
        const resultado = await Despesa.deletarCategoria(parseInt(id));
        if (resultado) {
          console.log('Categoria deletada com sucesso!');
        } else {
          console.log('Categoria não encontrada.');
        }
        mostrarMenu();
      } catch (err) {
        console.error('Erro ao deletar categoria', err.message);
      }
    });
  }

  // Função para listar categorias (GET)
async function listarCategorias() {
    try {
      const categorias = await Despesa.listarCategorias();
      console.log('\n=== Categorias ===');
      categorias.forEach((categoria) => {
        console.log(`${categoria.id} - ${categoria.nome}: ${categoria.descricao}`);
      });
      console.log('==================\n');
    } catch (err) {
      console.error('Erro ao listar categorias:', err.message);
    }
  }

// Função para exibir o menu principal
function mostrarMenu() {
  rl.question(menu, async (escolha) => {
    switch (escolha.trim()) {
        case '1': // Listar despesas
          await listarDespesas();
          break;
        case '2': // Cadastrar nova despesa
          await cadastrarDespesa();
          break;
        case '3': // Atualizar despesa
          await atualizarDespesa();
          break;
        case '4': // Deletar despesa
          await deletarDespesa();
          break;
        case '5': // Listar despesa por ID
          await listarDespesaPorId();
          break;
        case '6': // Listar categorias
          await listarCategorias();
          break;
        case '7': // Criar nova categoria
          await criarCategoria();
          break;
        case '8': // Deletar categoria
          await deletarCategoria();
          break;
          case '9': // Sair
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
    console.log('\n=== Despesas ===');
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
    try {
      const categorias = await Despesa.listarCategorias();
      console.log("\nEscolha uma categoria:");
      categorias.forEach((categoria) => {
        console.log(`${categoria.id} - ${categoria.nome}: ${categoria.descricao}`);
      });
  
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
    } catch (err) {
      console.error('Erro ao listar categorias:', err.message);
    }
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

// Função para listar despesa por ID (GETbyID)
async function listarDespesaPorId() {
     rl.question('Digite o ID da despesa que deseja consultar: ', async (id)=> {
  
    try {
      const despesa = await Despesa.listarPorId(id);
      if (!despesa) {
        console.log('Despesa não encontrada.');
      } else {
        console.log('Despesa encontrada:', despesa);
      }
    } catch (err) {
      console.error('Erro ao buscar despesa:', err);
    }
    mostrarMenu();
    });
  };
  
// Inicializa o script
console.log('\n','Bem-vindo ao sistema de gerenciamento de despesas!');
mostrarMenu();
