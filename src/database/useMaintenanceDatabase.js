import { useSQLiteContext } from "expo-sqlite";

export function useMaintenanceDatabase() {
  const database = useSQLiteContext();

  async function resetDatabase() {
    try {
      //DELETE -> APAGA OS DADOS
      //DROP -> exclui a tabela/entidade
      await database.execAsync(`DROP INDEX IF EXISTS idx_payments_data_pagamento;`);
      await database.execAsync(`DROP INDEX IF EXISTS idx_users_nome`);
      await database.execAsync(`DROP TABLE IF EXISTS payments;`);
      await database.execAsync(`DROP TABLE IF EXISTS users`);
      await database.execAsync(`
            CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            curso TEXT,
            email TEXT NOT NULL UNIQUE,
            data_pagamento DATE,
            senha TEXT NOT NULL DEFAULT 'A123456a!',
            role TEXT NOT NULL DEFAULT 'USER',
            created_at DATE DEFAULT CURRENT_TIMESTAMP,
            updated_at DATE
          );
      `);
      await database.execAsync(`
           CREATE TABLE payments (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_id INTEGER NOT NULL,
              user_cadastro INTEGER NOT NULL,
              valor_pago REAL NOT NULL,
              data_pagamento DATE NOT NULL,
              numero_recibo TEXT NOT NULL,
              observacao TEXT,
              imagem TEXT DEFAULT "",
              created_at DATE DEFAULT CURRENT_TIMESTAMP,
              updated_at DATE,
              FOREIGN KEY (user_id) REFERENCES users(id),
              FOREIGN KEY (user_cadastro) REFERENCES users(id)
            );  
      `);

      //para toda pesquisa/ordenação no banco que não seja chave primária, vc deve criar índices
      await database.execAsync(`CREATE INDEX IF NOT EXISTS idx_users_nome ON users (nome);`);
      await database.execAsync(`CREATE INDEX IF NOT EXISTS idx_payments_data_pagamento ON payments (data_pagamento);`);

      /**
       * #TODO - Adicionar usuários padrão
       */
      await database.execAsync(`INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('Super', 'super@email.com', 'A123456a!', 'SUPER');`);
      await database.execAsync(`INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('Admin', 'admin@email.com', 'A123456a!', 'ADMIN');  `);
      await database.execAsync(`INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('User', 'user@email.com', 'A123456a!', 'USER');`);

      console.log("Database reset successfully");
    } catch (error) {
      console.error("useMaintenanceDatabase resetDatabase error: ", error);
      throw error;
    }
  }

  async function importUsers() {
    const URL = "https://api.mockaroo.com/api/122ae070?count=40&key=1af2bf00"

    try {
      //recupera/solicita os dados da API/ da internet
      const response = await fetch(URL);
      //converte a resposta para o padrão json -> Javascript Object Notation
      //converte a resposta para o tipo texto;
      const users = await response.text();

      await database.withTransactionAsync(async () => {
        users.split(/\r?\n/).forEach(async (line) => {
          try {
            await database.execAsync(line);
          } catch (error) {
            console.error("Error importing user: ", error);
          }
        })
      })
      console.log("Usuários importados com sucesso")
    } catch (error) {
      console.error("useMaintenanceDatabase importUsers error: ", error);
      throw error;
    }
  }

  async function importPayments() {
    // Implementar a função de importação de pagamentos
    const URL = "https://api.mockaroo.com/api/3c491290?count=100&key=1af2bf00"

    try {
      //recupera/solicita os dados da API/ da internet
      const response = await fetch(URL);
      //converte a resposta para o padrão json -> Javascript Object Notation
      //converte a resposta para o tipo texto;
      const users = await response.text();

      await database.withTransactionAsync(async () => {
        users.split(/\r?\n/).forEach(async (line) => {
          try {
            await database.execAsync(line);
          } catch (error) {
            console.error("Error importing user: ", error);
          }
        })
      })
      console.log("Usuários importados com sucesso")
    } catch (error) {
      console.error("useMaintenanceDatabase importUsers error: ", error);
      throw error;
    }
  }

  return { resetDatabase, importUsers, importPayments }
}