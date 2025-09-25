import { User } from "react-native-auth0";

export interface ISessionData {
  accessToken: string;
  idToken: string;
  expiresAt: number;
  user: User;
}
