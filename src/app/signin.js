import { StatusBar } from "expo-status-bar";
import {
  Alert,
  BackHandler,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../hooks/Auth";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function App() {
  const { signIn, signOut } = useAuth();
  const [email, setEmail] = useState("super@email.com");
  const [password, setPassword] = useState("A123456a!");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
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
      <Text style={styles.title}>Aplicativo Pronto para Usar</Text>

      <View style={styles.inputbox}>
        <Ionicons name="mail-open-outline" size={20} color="white" />
        <TextInput
          style={styles.emailinput}
          placeholder="E-mail"
          placeholderTextColor="white"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputbox}>
        <Ionicons name="lock-closed-outline" size={20} color="white" />
        <TextInput
          style={styles.emailinput}
          placeholder="Senha"
          placeholderTextColor="white"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={passwordVisibility}
        />
        <Ionicons
          name={passwordVisibility ? "eye-off-outline" : "eye-outline"}
          size={20}
          color="white"
          onPress={togglePasswordVisibility}
        />
      </View>

      <Button
        color="green"
        title="Entrar"
        onPress={handleEntrarSuper}
      />
      <Button color="green" title="Sobre" onPress={() => router.push("about")} />
      <Button 
        color="green"
        title="Sair do Aplicativo"
        onPress={() => BackHandler.exitApp()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", 
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  title: {
    fontFamily: "bold",
    fontSize: 20,
    color: "white", 
  },
  inputbox: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
    marginHorizontal: 40,
    alignItems: "center",
  },
  emailinput: {
    flex: 1,
    fontFamily: "regular",
    fontSize: 20,
    color: "white", 
  },
  button: {
    width: "100%",
  },
});
