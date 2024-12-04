import { useSQLiteContext } from "expo-sqlite";

export function usePaymentsDatabase() {
    const database = useSQLiteContext();

    // Função para criar pagamento
    async function createPayment({
        user_id,
        user_cadastro,
        valor_pago,
        data_pagamento,
        observacao,
        numero_recibo,
        onPaymentCreated, // Função para atualizar a lista de pagamentos
    }) {
        const formattedDate = new Date(data_pagamento).toISOString().split('T')[0]; // Garantir formato de data
        console.log("Dados do pagamento a ser inserido:", {
            user_id,
            user_cadastro,
            valor_pago,
            data_pagamento: formattedDate,
            observacao,
            numero_recibo,
        });

        // Preparando a query para inserir no banco
        const statement = await database.prepareAsync(`
            INSERT INTO payments (user_id, user_cadastro, valor_pago, data_pagamento, observacao, numero_recibo)
            VALUES($user_id, $user_cadastro, $valor_pago, $data_pagamento, $observacao, $numero_recibo);
        `);

        try {
            const result = await statement.executeAsync({
                $user_id: user_id,
                $user_cadastro: user_cadastro,
                $valor_pago: valor_pago,
                $data_pagamento: formattedDate,
                $observacao: observacao,
                $numero_recibo: numero_recibo,
            });
            console.log("Pagamento inserido com sucesso! ID:", result.lastInsertRowId);

            // Atualiza a lista de pagamentos chamando a função fornecida
            if (onPaymentCreated) {
                onPaymentCreated(); // Recarrega a lista de pagamentos
            }

            return { insertedID: result.lastInsertRowId.toString() };
        } catch (error) {
            console.error("Erro ao tentar inserir pagamento:", error);
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    // Função para obter os pagamentos
    async function getPayments(page) {
        const offset = page * 5;
        const query = `
            SELECT p.*, u.nome
            FROM payments p
            INNER JOIN users u ON u.id = p.user_id
            ORDER BY p.data_pagamento DESC
            LIMIT 5 OFFSET ${offset};
        `;
        console.log("Executando consulta para listar pagamentos:", query);

        try {
            const payments = await database.getAllAsync(query);
            console.log("Pagamentos recuperados:", payments);
            return payments;
        } catch (error) {
            console.error("Erro ao buscar pagamentos:", error);
            throw error;
        }
    }

    async function getPayment(id) {
        try {
            const payment = await database.getFirstAsync(`
                SELECT p.*, u.nome
                FROM payments p
                INNER JOIN users u ON u.id = p.user_id
                WHERE p.id = ${id};
            `);
            return payment;
        } catch (error) {
            console.error("Erro ao buscar pagamento por ID:", error);
            throw error;
        }
    }

    async function setImagePayment(id, filename) {
        const updated_at = new Date().toISOString().split("T")[0];
        const statement = await database.prepareAsync(`
            UPDATE payments SET imagem = $filename, updated_at = $updated_at WHERE id = $id;
        `);

        try {
            const result = await statement.executeAsync({
                $filename: filename,
                $updated_at: updated_at,
                $id: id,
            });
            console.log("Imagem do pagamento atualizada:", result.changes);
            return result.changes;
        } catch (error) {
            console.error("Erro ao atualizar imagem do pagamento:", error);
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    return { createPayment, getPayments, getPayment, setImagePayment };
}
