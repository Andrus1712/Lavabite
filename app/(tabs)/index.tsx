import { StatsCarousel } from "@/components/StatsCarousel";
import { FontAwesome5 } from "@expo/vector-icons";
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
        icon: "cash-register",
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
    { id: "6", title: "Cobro servicio", icon: "money-bill", color: "#009688" },
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
            } else if (item.title === "Cobro de servicio" || item.title === "Cobro servicio") {
                router.push("/cobro-servicio");
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
                    <Text style={styles.headerTitle}>Dashboard</Text>
                </View>
                {/* Carrusel de estadísticas */}
                <StatsCarousel data={carouselData} />

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
        padding: 15,
        backgroundColor: "#2e78b7",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
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
