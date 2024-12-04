import { router, useLocalSearchParams } from "expo-router";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { useEffect, useState } from "react";
import { formatCurrencyBRL } from "../../utils/formatCurrent";
import { formatDateToBrazilian } from "../../utils/formatData";
import { usePickImage } from "../../utils/pickImage";
import { useConfig } from "../../hooks/Config";

export default function Details() {
  const { id } = useLocalSearchParams(); // Recebe o id dos parâmetros da URL
  const { getPayment, setImagePayment } = usePaymentsDatabase();
  const [payment, setPayment] = useState({});
  const { pickImage } = usePickImage();
  const { directory } = useConfig();

  // Função para buscar os dados do pagamento
  const fetchData = async () => {
    if (!id) return; // Garantir que o id existe antes de fazer a requisição
    try {
      const data = await getPayment(id);
      setPayment(data);
    } catch (error) {
      Alert.alert("Erro ao buscar pagamento");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]); // Dependência do 'id', atualiza a busca se o id mudar

  // Função para selecionar uma nova imagem
  const handlePickImage = async () => {
    try {
      const image = await pickImage();
      if (!image) return;
      setPayment((prevPayment) => ({
        ...prevPayment,
        imagem: image,
      }));
      await setImagePayment(id, image);
    } catch (error) {
      console.log("handlePickImage: ", error);
      Alert.alert("Erro ao buscar imagem");
    }
  };

  // Função para remover a imagem
  const handleRemoveImage = async () => {
    try {
      setPayment((prevPayment) => ({
        ...prevPayment,
        imagem: "",
      }));
      await setImagePayment(id, "");
    } catch (error) {
      console.log("handleRemoveImage: ", error);
      Alert.alert("Erro ao remover imagem");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Nome: {payment?.nome}</Text>
        <Text style={styles.text}>
          Data do Pagamento: {formatDateToBrazilian(payment?.data_pagamento || new Date())}
        </Text>
        <Text style={styles.text}>Num Recibo: {payment?.numero_recibo}</Text>
        <Text style={styles.text}>Valor Pago: {formatCurrencyBRL(payment?.valor_pago || 0)}</Text>
        <Text style={styles.text}>Observação: {payment?.observacao}</Text>
      </View>
      <View style={styles.contentImage}>
        {!!payment?.imagem ? (
          <Image source={{ uri: `${directory}/${payment?.imagem}` }} style={styles.image} />
        ) : (
          <Text style={styles.text}>Não há imagem cadastrada</Text>
        )}
      </View>
      <View style={styles.containerButtons}>
        <Button title="EDITAR" color="green" />
        <Button title="IMAGEM" onPress={handlePickImage} color="green" />
        <Button title="REMOVER IMAGEM" onPress={handleRemoveImage} color="green" />
        <Button title="VOLTAR" onPress={() => router.push("list")} color="green" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e0f2f1",
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontFamily: "monospace",
    fontSize: 16,
    color: "green",
    marginBottom: 10,
  },
});
