import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./shared/logger";

createApp().listen(env.PORT, () => logger.info(`API listening on port ${env.PORT}`));
