import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { z } from "zod";
import { useAuth } from "../../hooks/Auth/index";
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { useUsersDatabase } from "../../database/useUsersDatabase";

const paymentSchema = z.object({
  valor_pago: z.number().gt(0),
  user_id: z.number().int().positive(),
  user_cadastro: z.number().int().positive(),
  data_pagamento: z.string().datetime(),
  numero_recibo: z.string(),
  observacao: z.string().optional(),
});

export default function Payment() {
  const [valor, setValor] = useState("0,00");
  const [sugestoes, setSugestoes] = useState([]);
  const [id, setId] = useState(1);
  const [data, setData] = useState(new Date());
  const [viewCalendar, setViewCalendar] = useState(false);
  const [observacao, setObservacao] = useState("");
  const [numeroRecibo, setNumeroRecibo] = useState("");
  const valueRef = useRef();
  const { user } = useAuth();
  const { createPayment } = usePaymentsDatabase();
  const { getAllUsers } = useUsersDatabase();

  const handleCalendar = (event, selectedDate) => {
    setViewCalendar(false);
    setData(selectedDate);
  };

  useEffect(() => {
    (async () => {
      valueRef?.current?.focus();
      try {
        const users = await getAllUsers();
        setSugestoes(users);
        setId(users[0].id);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleChangeValor = (value) => {
    try {
      let valorLimpo = value.replace(",", "").replace(".", "");
      let valorConvertido = Number(valorLimpo) / 100;
      if (valorConvertido === 0 || isNaN(valorConvertido)) {
        setValor("0,00");
        return;
      }
      let valorPtBR = Intl.NumberFormat("pt-BR", {
        style: "decimal",
        minimumFractionDigits: 2,
      }).format(valorConvertido);
      setValor(valorPtBR);
    } catch (error) {
      setValor("0,00");
    }
  };

  const convertValue = (value) => {
    try {
      let valorLimpo = value.replace(",", "").replace(".", "");
      let valorConvertido = Number(valorLimpo) / 100;
      if (valorConvertido === 0 || isNaN(valorConvertido)) {
        return 0;
      }
      return valorConvertido;
    } catch (error) {
      return 0;
    }
  };

  const handleSubmit = async () => {
    const payment = {
      user_id: id,
      user_cadastro: Number(user.user.id),
      valor_pago: convertValue(valor),
      data_pagamento: data.toISOString(),
      numero_recibo: numeroRecibo,
      observacao,
    };

    try {
      const result = await paymentSchema.parseAsync(payment);
      payment.data_pagamento = data.toISOString(); // Garantindo o formato ISO
      const { insertedID } = await createPayment(payment);
      console.log("Pagamento salvo com ID:", insertedID);

      // Navegar para a lista com refresh
      router.push({ pathname: "/list", params: { refresh: true } });

      // Limpar campos
      setValor("0,00");
      setId(sugestoes[0]?.id || 1);
      setData(new Date());
      setObservacao("");
      setNumeroRecibo("");
      valueRef?.current?.focus();
    } catch (error) {
      Alert.alert("Erro", `Erro ao inserir pagamento: ${error.message}`);
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.content}>
        <Text>Inserir Pagamentos</Text>
        <View style={styles.inputView}>
          <Ionicons name="wallet-outline" size={24} color="black" />
          <TextInput
            placeholder="Valor"
            keyboardType="decimal-pad"
            style={styles.inputValor}
            value={valor}
            onChangeText={(newValue) => handleChangeValor(newValue)}
            ref={valueRef}
          />
        </View>

        <View style={styles.inputView}>
          <Ionicons name="cash-outline" size={24} color="black" />
          <TextInput
            placeholder="Número do Recibo"
            keyboardType="decimal-pad"
            style={styles.inputValor}
            value={numeroRecibo}
            onChangeText={setNumeroRecibo}
          />
        </View>

        <View style={styles.inputView}>
          <Picker
            selectedValue={id}
            onValueChange={(itemValue) => {
              setId(itemValue);
            }}
            style={{ width: "100%" }}
          >
            {sugestoes?.map((item) => {
              return <Picker.Item key={item.id} label={item.nome} value={item.id} />;
            })}
          </Picker>
        </View>

        <View style={styles.inputView}>
          <Text onPress={() => setViewCalendar(true)} style={styles.inputData}>
            {data.toLocaleDateString().split("T")[0]}
          </Text>
          {viewCalendar && (
            <DateTimePicker value={data} onChange={handleCalendar} mode="date" testID="dateTimePicker" />
          )}
        </View>

        <View style={styles.inputView}>
          <TextInput
            placeholder="Observações"
            style={styles.inputObservacao}
            value={observacao}
            onChangeText={setObservacao}
            multiline={true}
          />
        </View>

        <View style={styles.contentButtons}>
          <Button title="Salvar" color="green" onPress={handleSubmit} />
          <Button title="Cancelar" onPress={() => router.back()} color="green" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#e0f2f1",
  },
  inputView: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    borderColor: "green",
  },
  contentButtons: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-around",
  },
  inputValor: {
    flex: 1,
    textAlign: "right",
    padding: 10,
  },
  inputData: {
    width: "100%",
    textAlign: "center",
    fontFamily: "regular",
    fontSize: 20,
    padding: 10,
  },
  inputObservacao: {
    fontFamily: "regular",
    fontSize: 16,
    flex: 1,
    lineHeight: 20,
  },
});
