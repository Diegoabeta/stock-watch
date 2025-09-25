# 📱 Stock Watch

Stock Watch is a mobile app built with [Expo](https://expo.dev) and React Native that helps users track and visualize stock performance.  
The app supports authentication, watchlists, persistent storage, and real-time stock price updates.

---

## Features

- **Authentication with Auth0** (secure login and token handling - secures routes with expo-router guards)
- **Charts** using React Native Gifted Charts
- **Real-time stock quotes** via WebSockets (Finnhub API)
- **Data fetching & caching** with TanStack Query
- **Custom UI styling** with Styled Components
- **Persistent storage** using:
  - SecureStore (for Auth0 tokens)
  - AsyncStorage (for watchlists and app data)
- **TypeScript** for type safety and better developer experience
- **Unit tests** with Jest
- **ESLint & Prettier** for code quality and consistency

---

## Next Steps

- Add more chart types and customization options
- Expand watchlist features (e.g., sorting, filtering)
- Consider changing dropdown for a select component with search functionality
- Implement Firebase for remote config and secrets
- Implement Firebase Cloud Messaging for push notifications
- Add more unit and integration tests
- If states get more complex or need mutation, consider using Zustand for state management
- Implement CI/CD options for automated testing and deployment

---

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
