import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { z } from "zod";
import { useAuth } from "../../hooks/Auth/index";

const paymentSchema = z.object({
  valor_pago: z.number().gt(0),
  user_id: z.number().int().positive(),
  user_cadastro: z.number().int().positive(),
  data_pagamento: z.date(),
  observacao: z.string(),
});

export default function Payment() {
  const [valor, setValor] = useState("0,00");
  const [sugestoes, setSugestoes] = useState([
    {
      id: 1,
      nome: "Husain Leijs",
    },
    {
      id: 2,
      nome: "Addison Gun",
    },
    {
      id: 3,
      nome: "Tucky Banishevitz",
    },
    {
      id: 4,
      nome: "Debbi Figiovanni",
    },
    {
      id: 5,
      nome: "Dulcea Naisby",
    },
    {
      id: 6,
      nome: "Jaye Shimman",
    },
    {
      id: 7,
      nome: "Andrea McCrainor",
    },
    {
      id: 8,
      nome: "Hewe Morey",
    },
    {
      id: 9,
      nome: "Wileen Cund",
    },
    {
      id: 10,
      nome: "Theodoric Folli",
    },
    {
      id: 11,
      nome: "Ladonna Griffitt",
    },
    {
      id: 12,
      nome: "Dorine Reina",
    },
    {
      id: 13,
      nome: "Joice Walsh",
    },
    {
      id: 14,
      nome: "Tam Andrews",
    },
    {
      id: 15,
      nome: "Aliza Judd",
    },
    {
      id: 16,
      nome: "Alyson Faas",
    },
    {
      id: 17,
      nome: "Jasen McSherry",
    },
    {
      id: 18,
      nome: "Khalil Putnam",
    },
    {
      id: 19,
      nome: "Carlota Bostick",
    },
    {
      id: 20,
      nome: "Dirk Gilliat",
    },
    {
      id: 21,
      nome: "Catherine Bramsom",
    },
    {
      id: 22,
      nome: "Jocelyn Boucher",
    },
    {
      id: 23,
      nome: "Hartwell Gambie",
    },
    {
      id: 24,
      nome: "Lindsey Nutley",
    },
    {
      id: 25,
      nome: "Petr Fridd",
    },
    {
      id: 26,
      nome: "Guillermo Malkinson",
    },
    {
      id: 27,
      nome: "Mahmoud Howood",
    },
    {
      id: 28,
      nome: "Hunt Bondy",
    },
    {
      id: 29,
      nome: "Oralee Tant",
    },
    {
      id: 30,
      nome: "Ancell Sneezem",
    },
    {
      id: 31,
      nome: "Dorelle Caygill",
    },
    {
      id: 32,
      nome: "Glenn Taks",
    },
    {
      id: 33,
      nome: "Olav Cristofaro",
    },
    {
      id: 34,
      nome: "Frances Tunnacliffe",
    },
    {
      id: 35,
      nome: "Odella Casari",
    },
  ]);
  const [id, setId] = useState(1);
  const [data, setData] = useState(new Date());
  const [viewCalendar, setViewCalendar] = useState(false);
  const [observacao, setObservacao] = useState("");
  const valueRef = useRef();
  const { user } = useAuth();

  const handleCalendar = (event, selectedDate) => {
    setViewCalendar(false);
    setData(selectedDate);
  };

  useEffect(() => {
    valueRef?.current?.focus();
  }, []);

  const handleChangeValor = (value) => {
    try {
      let valorLimpo = value.replace(",", "").replace(",", "");
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
      let valorLimpo = value.replace(",", "").replace(",", "");
      let valorConvertido = Number(valorLimpo) / 100;
      if (valorConvertido === 0 || isNaN(valorConvertido)) {
        return 0;
      }
      return valorConvertido;
    } catch (error) {
      return valorConvertido;
    }
  };

  const handleSubmit = async () => {
    const payment = {
      user_id: id,
      user_cadastro: Number(user.user.id),
      valor_pago: convertValue(valor),
      data_pagamento: data,
      observacao,
    };

    try {
      const result = await paymentSchema.parseAsync(payment);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
          <Picker
            selectedValue={id}
            onValueChange={(itemValue, index) => {
              setId(itemValue);
            }}
            style={{ width: "100%" }}
          >
            {sugestoes?.map((item) => {
              return (
                <Picker.Item key={item.id} label={item.nome} value={item.id} />
              );
            })}
          </Picker>
        </View>
        <View style={styles.inputView}>
          <Text onPress={() => setViewCalendar(true)} style={styles.inputData}>
            {data.toLocaleDateString().split("T")[0]}
          </Text>
          {viewCalendar && (
            <DateTimePicker
              value={data}
              onChange={handleCalendar}
              mode="date"
              testID="dateTimePicker"
            />
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
          <Button title="Salvar" onPress={handleSubmit} />
          <Button title="Continuar" />
          <Button title="Cancelar" onPress={() => router.back()} />
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
  },
  inputView: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
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
