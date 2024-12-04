import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Alterado para incluir TouchableOpacity
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { FlashList } from "@shopify/flash-list";
import { formatDateToBrazilian } from "../../utils/formatData";
import { formatCurrencyBRL } from "../../utils/formatCurrent";
import { router } from "expo-router"; // Importar o router para navegação

export default function List() {
  const [data, setData] = useState([]);
  const { getPayments } = usePaymentsDatabase();
  const [page, setPage] = useState(0); //controlar qual página o sistema já carregou
  const [loading, setLoading] = useState(true); //controlar se está carregando os dados do banco
  const [hasMore, setHasMore] = useState(true); //controlar se tem mais dados para carregar

  async function fetchData() {
    if (hasMore === false) return; //se esta flag for falsa, não tiver mais dados para carregar, não faz nada
    console.log(page);
    setPage(page + 1);

    //vai buscar no banco de dados os dados os pagamentos
    const payments = await getPayments(page);

    if (payments.length < 5) setHasMore(false); //se a quantidade de dados for menor que 5, não tem mais dados para carregar

    setData([...data, ...payments]);
    setLoading(false);
  }

  useEffect(() => {
    //Executa a primeira vez a busca de dados
    setPage(0);
    fetchData();
  }, []);

  // Alterado: Use TouchableOpacity para permitir clicar no item
  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => router.push(`/details?id=${item.id}`)} // Navegar para details.js com o ID do item
    >
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={{ fontFamily: "bold", fontSize: 18, textTransform: "uppercase" }}>
          {item.nome}
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={{ fontFamily: "regular" }}>
            {formatDateToBrazilian(item.data_pagamento || new Date())}
          </Text>
          <Text>{item.numero_recibo}</Text>
        </View>
      </View>
      <View>
        <Text style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          {formatCurrencyBRL(item.valor_pago || 0)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <FlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={200}
          onEndReached={fetchData}
          onEndReachedThreshold={0.8}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9", // Fundo verde clarinho moderno
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    margin: 5,
    padding: 3,
    backgroundColor: "lightgray",
    borderRadius: 10,
  },
});
