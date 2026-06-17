  import express from "express";
  import log from "./src/logger/logger";
  const morgan = require("morgan");
  import cors from "cors";
  import auth from "./src/routes/auth/auth";
  import userList from "./src/routes/user/user";
  import ilan from "./src/routes/ilan/ilan";
  import yorum from "./src/routes/yorum/yorum";
  import ozellikList from "./src/routes/ozellik/ozellik";
import locationRoutes from "./src/routes/ililcemahalle/ililcemahalle";
  const helmet = require("helmet");

  export const setRoutes = (app: express.Application) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(log);
    if (app.get("env") === "development") {
      app.use(morgan("combined"));
    }
    app.use(express.static("public"));
    app.use(helmet());

    app.use("/api/auth", auth);
    app.use("/api/user", userList);
    app.use("/api/ilan", ilan);
    app.use("/api/ililcemahalle", locationRoutes);
    app.use("/api/ozellik", ozellikList);
    app.use("/api/yorum", yorum);
  };
