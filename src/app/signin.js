import { StatusBar } from "expo-status-bar";
import { Alert, BackHandler, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks/Auth";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'; 

export default function App() {
  const { signIn, signOut } = useAuth();
  const [email, setEmail] = useState("super@email.com");
  const [password, setPassword] = useState("A123456a!");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const tooglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleEntrarSuper = async () => {
    try {
      await signIn({ email, password });
    } catch (error) {
      Alert.alert("Erro", error.message);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Periféricos</Text>
      <FontAwesome6 name="newspaper" size={24} color="green" />
      <View style={styles.inputbox}>
        <Ionicons name="mail-open-outline" size={20} color="green" />
        <TextInput
          style={styles.emailinput}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputbox}>
        <Ionicons name="lock-closed-outline" size={20} color="green" />
        <TextInput
          style={styles.emailinput}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={passwordVisibility}
        />
        <Ionicons
          name={passwordVisibility ? "eye-off-outline" : "eye-outline"}
          size={20}
          color="green"
          onPress={tooglePasswordVisibility}
        />
      </View>

      <TouchableOpacity onPress={handleEntrarSuper} style={styles.button}>
        <Text style={styles.textbutton}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("about")} style={styles.button}>
        <Text style={styles.textbutton}>Sobre</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("maintense")} style={styles.button}>
        <Text style={styles.textbutton}>Banco</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => BackHandler.exitApp()} style={styles.button}>
        <Text style={styles.textbutton}>Sair</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2f1',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  title: {
    fontFamily: "bold",
    fontSize: 20,
    color: 'green',
  },
  inputbox: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 40,
    marginVertical: 10,
    alignItems: "center",
  },
  emailinput: {
    flex: 1,
    fontFamily: "regular",
    fontSize: 20,
    color: 'green',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 5,
    width: 200,
  },
  textbutton: {
    color: 'white',
    alignSelf: 'center',
  },


});
