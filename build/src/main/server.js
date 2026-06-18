"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dependency_injection_1 = require("./dependency-injection");
const routes_1 = require("../presentation/routes");
const errorHandler_1 = require("../presentation/middlewares/errorHandler");
const env_1 = require("../infrastructure/config/env");
const createServer = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: (origin, callback) => {
            if (!origin ||
                origin.startsWith("http://localhost") ||
                origin.startsWith("http://192.168.1.174") ||
                origin === "https://baysoftworks.com") {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.static("public"));
    app.use((0, helmet_1.default)());
    if (env_1.env.nodeEnv === "development") {
        app.use((0, morgan_1.default)("combined"));
    }
    app.use("/api", (0, routes_1.createApiRoutes)(dependency_injection_1.container.userController, dependency_injection_1.container.authController));
    app.use(errorHandler_1.errorHandler);
    return app;
};
exports.createServer = createServer;
const startServer = () => {
    const app = (0, exports.createServer)();
    app.listen(env_1.env.port, () => {
        console.log(`Listening on port ${env_1.env.port}`);
    });
};
exports.startServer = startServer;
