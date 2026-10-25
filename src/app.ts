import express from "express";
import helmet from "helmet";
import { errorHandler } from "./middleware/error-handler";
import { authRouter } from "./modules/auth";
import { billingRouter } from "./modules/billing";
import { duoRouter } from "./modules/duo";
import { notificationsRouter } from "./modules/notifications";
import { syncRouter } from "./modules/sync";

export function createApp() {
    const app = express();
    app.set("trust proxy", 1); // derrière un reverse proxy
    app.use(helmet());
    app.use(express.json({ limit: "512kb" }));

    app.get("/health", (_req, res) => res.json({ ok: true }));

    const v1 = express.Router();
    v1.use("/auth", authRouter);
    v1.use("/sync", syncRouter);
    v1.use("/billing", billingRouter);
    v1.use("/duo", duoRouter);
    v1.use("/notifications", notificationsRouter);
    app.use("/v1", v1);

    app.use(errorHandler);
    return app;
}
