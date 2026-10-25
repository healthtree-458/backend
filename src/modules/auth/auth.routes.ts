import { Router } from "express";
import { loginSchema } from "./auth.schemas";
import { authService } from "./auth.service";

export const authRouter = Router();

authRouter.post("/login", async (req, res, next) => {
    try {
        const input = loginSchema.parse(req.body);
        res.json(await authService.login(input));
    } catch (e) {
        next(e);
    }
});
