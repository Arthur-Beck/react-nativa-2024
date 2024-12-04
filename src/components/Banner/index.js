import { useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import PagerView from "react-native-pager-view";

export function Banner() {
    const [page, setPage] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null); // Estado para o produto selecionado
    const [modalVisible, setModalVisible] = useState(false); // Estado para exibir o modal

    const products = [
        { id: 1, name: "Alto Falante", image: require("../../assets/altofalante.webp"), description: "Alto falante de alta qualidade para som ambiente." },
        { id: 2, name: "Microfone", image: require("../../assets/microfone.webp"), description: "Microfone profissional para gravações e apresentações." },
        { id: 3, name: "Monitor", image: require("../../assets/monitor.webp"), description: "Monitor Full HD com cores vivas e alta definição." },
        { id: 4, name: "Teclado", image: require("../../assets/shopping (1).webp"), description: "Carrinho de compras compacto e dobrável." },
        { id: 5, name: "Mouse", image: require("../../assets/mouse.webp"), description: "Mouse ergonômico para uso confortável." },
    ];

    const onPageSelected = (e) => {
        setPage(e.nativeEvent.position);
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <PagerView
                initialPage={0}
                style={styles.content}
                onPageSelected={onPageSelected}
            >
                {products.map((product, index) => (
                    <View key={index} style={styles.page}>
                        <Image
                            source={product.image}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>
                ))}
            </PagerView>

            <View style={styles.bulletContent}>
                {products.map((_, index) => (
                    <View
                        key={index}
                        style={[styles.bullet, page === index && styles.activeBullet]}
                    ></View>
                ))}
            </View>

            {/* Caixas para os produtos */}
            <View style={styles.productGrid}>
                {products.map((product) => (
                    <TouchableOpacity
                        key={product.id}
                        style={styles.productBox}
                        onPress={() => openModal(product)}
                    >
                        <Image source={product.image} style={styles.productImage} />
                        <Text style={styles.productName}>{product.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Modal para exibir informações do produto */}
            {selectedProduct && (
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Image
                                source={selectedProduct.image}
                                style={styles.modalImage}
                            />
                            <Text style={styles.modalTitle}>
                                {selectedProduct.name}
                            </Text>
                            <Text style={styles.modalDescription}>
                                {selectedProduct.description}
                            </Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e0f2f1",
    },
    content: {
        marginTop: 20,
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    page: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
    },
    bulletContent: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    bullet: {
        width: 12,
        height: 12,
        borderRadius: 6,
        margin: 8,
        backgroundColor: "#ccc",
    },
    activeBullet: {
        backgroundColor: "green",
    },
    productGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginTop: 20,
    },
    productBox: {
        width: "45%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    productImage: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    modalImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: "green",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});
