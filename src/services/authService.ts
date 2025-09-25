import { User } from "react-native-auth0/lib/typescript/types";
import { auth0Client } from "./auth0Client";
import { ISessionData } from "./types";

export interface IServiceResult<T> {
  data: T | null;
  error: string | null;
}

class _AuthService {
  async login(): Promise<IServiceResult<ISessionData>> {
    try {
      const credentials = await auth0Client.webAuth.authorize();
      const user = await auth0Client.auth.userInfo({ token: credentials.accessToken });

      return {
        data: {
          accessToken: credentials.accessToken,
          idToken: credentials.idToken,
          expiresAt: credentials.expiresAt,
          user,
        },
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.message || "Login failed",
      };
    }
  }

  async logout(): Promise<IServiceResult<{ success: boolean }>> {
    try {
      await auth0Client.webAuth.clearSession();
      return { data: { success: true }, error: null };
    } catch (error: any) {
      return { data: null, error: error.message || "Logout failed" };
    }
  }

  async getUserInfo(accessToken: string): Promise<IServiceResult<User>> {
    try {
      const user = await auth0Client.auth.userInfo({ token: accessToken });
      return { data: user, error: null };
    } catch (error: any) {
      return { data: null, error: error.message || "Failed to fetch user info" };
    }
  }
}

export const AuthService = new _AuthService();
