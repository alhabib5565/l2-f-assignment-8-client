import { jwtDecode } from "jwt-decode";

export const jwtDecoder = (token: string) => {
    const decoded = jwtDecode(token);
    return decoded
}