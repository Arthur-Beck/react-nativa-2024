import { router } from "expo-router";
import { Button, Text, View, Image, StyleSheet } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://avatars.githubusercontent.com/u/181650606?v=4'
        }}
        style={styles.image} 
      />
      <Text style={styles.title}>Sobre este Projeto</Text>
      <Text style={styles.text}>
        Me chamo Arthur Beck Brasiliense, matriculado na Etec Prof. Milton Gazzetti e estou realizando este projeto com base nas atividades do professor Graziani, sendo o assunto deste aplicativo periféricos.
      </Text>  
      <Button title="Voltar" onPress={() => { router.replace("/") }} color="green" /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',  
    padding: 20,
    alignItems: 'center', 
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 30,
    marginTop: 20,
    alignSelf: 'center', 
  },
  title: {
    color: 'purple',           
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    color: 'purple',           
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
