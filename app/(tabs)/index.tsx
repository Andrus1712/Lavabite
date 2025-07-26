import { StatsCarousel } from "@/components/StatsCarousel";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Datos de los módulos
const MODULES = [
    {
        id: "1",
        title: "Cobro de servicio",
        icon: "money-bill",
        color: "#4CAF50",
    },
    { id: "2", title: "Nuevo servicio", icon: "plus-circle", color: "#2196F3" },
    {
        id: "3",
        title: "Registro de clientes",
        icon: "user-plus",
        color: "#FF9800",
    },
    { id: "4", title: "Ver vehículos", icon: "car", color: "#9C27B0" },
    { id: "5", title: "Histórico del día", icon: "history", color: "#F44336" },
    { id: "6", title: "Metricas", icon: "chart-pie", color: "#009688" },
];

export default function Dashboard() {
    const carouselData = [
        {
            id: "1",
            title: "Vehículos lavados hoy",
            value: 128,
            subtitle: "15% más que ayer",
        },
        {
            id: "2",
            title: "Monto generado",
            value: "$15,750",
            subtitle: "Total del día",
        },
        {
            id: "3",
            title: "Vehículos en curso",
            value: 5,
            subtitle: "Tiempo promedio: 25 min",
        },
        {
            id: "4",
            title: "Clientes nuevos",
            value: 12,
            subtitle: "Esta semana",
        },
    ];

    const renderModuleItem = (item) => {
        const handleModulePress = () => {
            if (item.title === "Nuevo servicio") {
                router.push("/nuevo-servicio");
            } else if (
                item.title === "Cobro de servicio" ||
                item.title === "Cobro servicio"
            ) {
                router.push("/cobro-servicio");
            } else if (item.title === "Ver vehículos") {
                router.push("/vehiculos");
            } else if (item.title === "Metricas") {
                router.push("/metricas");
            } else {
                console.log(`Módulo ${item.title} presionado`);
            }
        };

        return (
            <TouchableOpacity
                key={item.id}
                style={styles.moduleItem}
                onPress={handleModulePress}
            >
                <View
                    style={[
                        styles.moduleIconContainer,
                        { backgroundColor: `${item.color}20` },
                    ]}
                >
                    <FontAwesome5
                        name={item.icon}
                        size={24}
                        color={item.color}
                    />
                </View>
                <Text style={styles.moduleTitle}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <View style={styles.headerTop}>
                            <View style={styles.welcomeSection}>
                                <Text style={styles.welcomeText}>
                                    Bienvenido
                                </Text>
                                <Text style={styles.headerTitle}>
                                    Dashboard Lavabite
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.notificationButton}>
                                <Ionicons
                                    name="notifications-outline"
                                    size={24}
                                    color="#2e78b7"
                                />
                                <View style={styles.notificationBadge} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.quickStats}>
                            <View style={styles.quickStatItem}>
                                <Ionicons
                                    name="today-outline"
                                    size={20}
                                    color="#666"
                                />
                                <Text style={styles.quickStatText}>Hoy</Text>
                            </View>
                            <View style={styles.quickStatItem}>
                                <Ionicons
                                    name="location-outline"
                                    size={20}
                                    color="#666"
                                />
                                <Text style={styles.quickStatText}>
                                    Sucursal Centro
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Carrusel de estadísticas */}
                <View style={styles.carouselSection}>
                    <StatsCarousel data={carouselData} />
                </View>

                <View style={styles.modulesContainer}>
                    <Text style={styles.sectionTitle}>Módulos</Text>
                    <ScrollView contentContainerStyle={styles.modulesGrid}>
                        {MODULES.map(renderModuleItem)}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        backgroundColor: "white",
        paddingTop: 20,
        paddingBottom: 30,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerContent: {
        flex: 1,
    },
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    welcomeSection: {
        flex: 1,
    },
    welcomeText: {
        fontSize: 16,
        color: "#666",
        marginBottom: 4,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    notificationButton: {
        position: "relative",
        padding: 8,
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
    },
    notificationBadge: {
        position: "absolute",
        top: 6,
        right: 6,
        width: 8,
        height: 8,
        backgroundColor: "#FF4444",
        borderRadius: 4,
    },
    quickStats: {
        flexDirection: "row",
        gap: 20,
    },
    quickStatItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    quickStatText: {
        color: "#666",
        fontSize: 14,
        fontWeight: "500",
    },
    carouselSection: {
        paddingBottom: 10,
    },
    sliderContainer: {
        height: "30%",
        paddingVertical: 15,
    },
    sliderScrollContent: {
        paddingHorizontal: 10,
    },
    sliderItem: {
        // backgroundColor: "white",
        // borderRadius: 10,
        height: "100%",
        // width: screenWidth - 60,
        marginHorizontal: 10,
        padding: 10,
        // justifyContent: "center",
        // alignItems: "center",
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        // elevation: 3,
    },
    sliderImage: {
        width: "80%",
        height: "70%",
        resizeMode: "contain",
    },
    sliderTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    modulesContainer: {
        flex: 1,
        padding: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
    },
    modulesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    moduleItem: {
        width: "48%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    moduleIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    moduleTitle: {
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
        color: "#333",
    },
    statsContainer: {
        marginBottom: 24,
    },
});
