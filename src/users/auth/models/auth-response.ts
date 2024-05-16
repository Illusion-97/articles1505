import { User } from "src/users/models/user";

export interface AuthResponse {
    user: User;
    accessToken: string;
}
