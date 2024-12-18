import { router } from "expo-router";
import { Button, Text, View, Image } from "react-native";

export default function About() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0f2f1' }}>
            <Image
                source={{
                    uri: 'https://avatars.githubusercontent.com/u/181650606?v=4',
                }}
                style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }} 
            />
            <Text style={{ fontFamily: 'monospace', fontSize: 24, color: 'green', marginBottom: 10 }}>Sobre o Projeto</Text>
            <Text style={{ fontFamily: 'monospace', fontSize: 16, color: 'green', textAlign: 'center', marginHorizontal: 20, marginBottom: 20 }}>
                O tema desse projeto é criar um aplicativo para listar periféricos.
            </Text>
            <Button title="Voltar" onPress={() => router.back()} color="green" />
        </View>
    );
}
