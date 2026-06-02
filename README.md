# Lavabite

Lavabite es una aplicación móvil construida con **Expo**, **React Native** y **Expo Router**. Está pensada para administrar servicios, clientes y vehículos desde una interfaz nativa y multiplataforma.

## 🚀 Descripción

Proyecto Expo con navegación basada en rutas de archivo. Incluye pantallas para:

- Gestión de clientes
- Listado y cobro de servicios
- Registro de nuevos servicios
- Manejo de vehículos
- Visualización de métricas
- Perfil de usuario

## 🎬 Vista previa

![Preview Lavabite 1](@file:assets/images/Picture1.png)

![Preview Lavabite 2](@file:assets/images/Picture2.png)

## 📁 Estructura principal

- `app/` - Rutas y pantallas de la aplicación.
  - `app/(tabs)/` - Navegación por pestañas.
  - `app/index.tsx` - Pantalla principal.
  - `app/vehiculos.tsx`, `app/metricas.tsx`, `app/cobro-servicio.tsx`, `app/nuevo-servicio.tsx`, `app/vehiculo-form.tsx` - Páginas funcionales.
- `components/` - Componentes reutilizables.
- `assets/` - Imágenes, fuentes y recursos estáticos.
- `constants/` - Constantes de la aplicación.
- `hooks/` - Hooks personalizados.
- `scripts/` - Scripts auxiliares, por ejemplo `reset-project.js`.

## 📦 Dependencias principales

- `expo`
- `expo-router`
- `react`
- `react-native`
- `@react-navigation/bottom-tabs`
- `react-native-chart-kit`
- `react-native-snap-carousel`
- `expo-image`, `expo-font`, `expo-splash-screen`, `expo-haptics`, `expo-linking`, `expo-web-browser`

## 🧰 Scripts disponibles

- `npm start` - Inicia Expo Dev Tools.
- `npm run android` - Inicia la app en Android.
- `npm run ios` - Inicia la app en iOS.
- `npm run web` - Inicia la app en web.
- `npm run lint` - Ejecuta ESLint.
- `npm run reset-project` - Ejecuta `scripts/reset-project.js`.

## ⚙️ Configuración inicial

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar la aplicación:
   ```bash
   npm start
   ```

3. Abrir en Android, iOS o web desde el dashboard de Expo.

## 🧩 Requisitos

- Node.js compatible con Expo.
- Emulador o dispositivo físico para probar Android/iOS.
- Expo CLI si se usa con comandos directos.

## 📌 Notas

- La configuración de la app se encuentra en `app.json`.
- Usa `expo-router` con `typedRoutes` habilitado para una navegación limpia.
- El proyecto está configurado para Android, iOS y web.

---

> Documentación generada para el proyecto `Lavabite`.
