import express from "express";
import { connectMongoDB } from "./config/mongoDB.config.js";
import envs from "./config/envs.config.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import { errorHandle } from "./errors/errHandle.js";
import { logger } from "./utils/logger.js";
import swaggerUiExpress from "swagger-ui-express";
import { specs } from "./config/swager.config.js";

const app = express();
connectMongoDB();
app.use(express.urlencoded({ extended: true }));
const PORT = envs.PORT || 8080;
app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use("/api", router);
app.use(errorHandle);
app.listen(PORT, () => logger.info(`Listening on ${PORT}`));
