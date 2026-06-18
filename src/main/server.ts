import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { container } from "./dependency-injection";
import { createApiRoutes } from "../presentation/routes";
import { errorHandler } from "../presentation/middlewares/errorHandler";
import { env } from "../infrastructure/config/env";

export const createServer = (): Application => {
  const app = express();

  app.use(
    cors({
      origin: (origin, callback) => {
        if (
          !origin ||
          origin.startsWith("http://localhost") ||
          origin.startsWith("http://192.168.1.174") ||
          origin === "https://baysoftworks.com"
        ) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(helmet());

  if (env.nodeEnv === "development") {
    app.use(morgan("combined"));
  }

  app.use(
    "/api",
    createApiRoutes(container.userController, container.authController),
  );

  app.use(errorHandler);

  return app;
};

export const startServer = (): void => {
  const app = createServer();
  app.listen(env.port, () => {
    console.log(`Listening on port ${env.port}`);
  });
};
