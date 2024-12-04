import { router } from "expo-router";
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMaintenanceDatabase } from "../database/useMaintenanceDatabase";
import { useState } from "react";

export default function Maintenance() {
    const { resetDatabase, importUsers, importPayments } = useMaintenanceDatabase();
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [loadingPayments, setLoadingPayments] = useState(false);

    const handleReset = async () => {
        try {
            await resetDatabase();
            Alert.alert("Sucesso", "Banco de dados zerado com sucesso!");
        } catch (error) {
            Alert.alert("Erro", "Erro ao zerar o banco de dados.");
        }
    };

    const handleImportUsers = async () => {
        try {
            setLoadingUsers(true);
            await importUsers();
            Alert.alert("Sucesso", "Usuários importados com sucesso!");
        } catch (error) {
            Alert.alert("Erro", "Erro ao importar usuários.");
        } finally {
            setLoadingUsers(false);
        }
    };

    const handleImportPayments = async () => {
        try {
            setLoadingPayments(true);
            await importPayments();
            Alert.alert("Sucesso", "Pagamentos importados com sucesso!");
        } catch (error) {
            Alert.alert("Erro", "Erro ao importar pagamentos.");
        } finally {
            setLoadingPayments(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manutenção do Banco de Dados</Text>
            <View style={styles.contentButtons}>
                <Button title="Zerar" onPress={handleReset} color="green" />
                <TouchableOpacity onPress={handleImportUsers} style={styles.touchableOpacity}>
                    {loadingUsers ? (
                        <ActivityIndicator color="#e0f2f1" />
                    ) : (
                        <Text style={styles.buttonTitle}>Importar Usuários</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={handleImportPayments} style={styles.touchableOpacity}>
                    {loadingPayments ? (
                        <ActivityIndicator color="#e0f2f1" />
                    ) : (
                        <Text style={styles.buttonTitle}>Importar Pagamentos</Text>
                    )}
                </TouchableOpacity>
                <Button title="Voltar" onPress={() => router.back()} color="green" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0f2f1",
    },
    title: {
        fontSize: 20,
        fontFamily: "monospace",
        color: "green",
        marginBottom: 20,
    },
    buttonTitle: {
        fontSize: 16,
        fontFamily: "monospace",
        color: "#fff",
        textTransform: "uppercase",
    },
    contentButtons: {
        marginTop: 20,
        gap: 10,
    },
    touchableOpacity: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
});
