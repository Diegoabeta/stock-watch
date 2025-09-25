import * as SecureStore from "expo-secure-store";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { User } from "react-native-auth0/lib/typescript/types";
import { AuthService } from "../services/authService";
import { ISessionData } from "../services/types";
import { isTokenValid } from "../utils/validation";

interface IAuthContext {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from SecureStore on mount if exists
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const stored = await SecureStore.getItemAsync("auth");

        if (stored) {
          const { accessToken, expiresAt, user }: ISessionData = JSON.parse(stored);
          if (isTokenValid(expiresAt)) {
            setAccessToken(accessToken);
            setUser(user);
          } else {
            await SecureStore.deleteItemAsync("auth");
          }
        }
      } catch (error) {
        console.log("Failed to restore auth session", error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async () => {
    const result = await AuthService.login();

    if (result.data) {
      const { accessToken, user } = result.data;
      setAccessToken(accessToken);
      setUser(user);
      try {
        await SecureStore.setItemAsync("auth", JSON.stringify(result.data));
      } catch (error) {
        console.log("Failed to save auth session to SecureStore", error);
      }
    } else if (result.error) {
      Alert.alert(result.error);
    }
  };

  const logout = async () => {
    const result = await AuthService.logout();

    if (result.data?.success) {
      try {
        await SecureStore.deleteItemAsync("auth");
      } catch (error) {
        console.log("Failed to delete auth session from SecureStore", error);
      }
      setUser(null);
      setAccessToken(null);
    } else if (result.error) {
      Alert.alert(result.error);
    }
  };

  return <AuthContext value={{ user, isLoading, accessToken, login, logout }}>{children}</AuthContext>;
};
