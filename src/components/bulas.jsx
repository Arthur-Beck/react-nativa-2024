import { router } from "expo-router";
import { Button, Text, View, Image } from "react-native";

export default function Bula() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0f2f1' }}>
            <Image
                source={require("../../assets/atenolol.png")}
                style={{ width: 700, height: 250, marginBottom: 5, }} 
                resizeMode="contain"
            />
            <Text style={{ fontFamily: 'monospace', fontSize: 16, color: 'green', textAlign: 'center', marginHorizontal: 20, marginBottom: 20 }}>
              LOCAL DE INSERIR A BULA
            </Text>
            <Button title="Voltar" onPress={() => router.back()} color="green" />
        </View>
    );
}
