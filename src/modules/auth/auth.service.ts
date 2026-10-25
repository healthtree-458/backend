import { authRepository } from "./auth.repository";
import { LoginInput } from "./auth.schemas";

export const authService = {
    async login(input: LoginInput) {
        const user = await authRepository.findUserByGoogleSub(input.idToken);

        return {
            message: "login not implemented",
            userFound: user !== null,
        };
    },
};
