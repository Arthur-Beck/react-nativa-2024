export async function initializeDatabase(database) {
  try {
      await database.execAsync(`
          DROP TABLE IF EXISTS payments;
          DROP TABLE IF EXISTS users;
          DROP INDEX IF EXISTS idx_users_nome;
          DROP INDEX IF EXISTS idx_payments_data_pagamento;

          CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              nome TEXT,
              curso TEXT,
              email TEXT NOT NULL UNIQUE,
              data_pagamento DATE,
              senha TEXT NOT NULL DEFAULT 'A123456a!',
              role TEXT NOT NULL DEFAULT 'USER',
              imagem TEXT DEFAULT "",
              created_at DATE DEFAULT CURRENT_TIMESTAMP,
              updated_at DATE
          );

          CREATE TABLE IF NOT EXISTS payments (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_id INTEGER NOT NULL,
              user_cadastro INTEGER NOT NULL,
              valor_pago REAL NOT NULL,
              data_pagamento DATE NOT NULL,
              numero_recibo TEXT NOT NULL,
              observacao TEXT,
              created_at DATE DEFAULT CURRENT_TIMESTAMP,
              updated_at DATE,
              FOREIGN KEY (user_id) REFERENCES users(id),
              FOREIGN KEY (user_cadastro) REFERENCES users(id)
          );

          CREATE INDEX IF NOT EXISTS idx_users_nome ON users (nome);
          CREATE INDEX IF NOT EXISTS idx_payments_data_pagamento ON payments (data_pagamento);

          INSERT OR REPLACE INTO users (nome, email, senha, role) 
          VALUES 
              ('Super', 'super@email.com', 'A123456a!', 'SUPER'),
              ('Admin', 'admin@email.com', 'A123456a!', 'ADMIN'),
              ('User', 'user@email.com', 'A123456a!', 'USER');

          INSERT INTO payments (user_id, user_cadastro, valor_pago, data_pagamento, numero_recibo, observacao)
          VALUES 
              (1, 2, 100.0, '2024-11-29', '001', 'Teste inicial'),
              (2, 1, 50.0, '2024-11-28', '002', 'Outro teste');
      `);
      console.log("Banco de dados inicializado com sucesso.");
  } catch (error) {
      console.error("Erro ao inicializar banco de dados:", error);
  }
}
