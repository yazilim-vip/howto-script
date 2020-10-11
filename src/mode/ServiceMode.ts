import express, { Request, Response, Router } from "express";
import createError from "http-errors";
import cors from "cors";
import * as http from "http";

import App from "./App";

import generateHowto from "../service/HowtoService";
import {
  DEFAULT_SERVICE_PORT,
} from "../constants/Constant";

export default class ServiceMode extends App {
  server?: http.Server;
  app: express.Application;
  port: string;

  constructor(
    howtoRootDir: string | null,
    port: string = DEFAULT_SERVICE_PORT
  ) {
    super(howtoRootDir);
    this.port = port;
    this.app = express();

    // init app
    this.configure();
    // error handler TODO:
  }

  protected run(): void {
    this.startServer();
  }

  configure(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());

    this.app.use("/howto", this.getRouter());

    // catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      next(createError(404));
    });

    this.app.set("port", this.port);
  }

  startServer(): void {
    // console.log(this.app._router.stack);
    this.server = http.createServer(this.app);
    this.server.listen(this.port);
    const port = this.port;
    this.server.on("error", (error: NodeJS.ErrnoException): void => {
      if (error.syscall !== "listen") {
        throw error;
      }

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          console.error(port + " requires elevated privileges");
          process.exit(1);
          break;
        case "EADDRINUSE":
          console.error(port + " is already in use");
          process.exit(1);
          break;
        default:
          throw error;
      }
    });

    this.server.on("listening", () => {
      console.log("Listening on " + this.port);
    });
  }

  getRouter(): Router {
    const router = express.Router();
    const howtoRootDir = this.howtoRootDir;
    router.get("/", (req: Request, res: Response) => {
      try {
        const handler = <T>(result: T) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result));
        };

        /*
            Example Requests
      
            ROOT: /home/maemresen/tmp
      
            req.originalUrl =
              /howto
              /howto/linux
              /howto/linux/specific_distro
          */
        let categoryPath = ``;
        if (req.query.path) {
          categoryPath += "/" + req.query.path;
        }

        generateHowto(howtoRootDir, handler, categoryPath, handler);
      } catch (error) {
        console.error(error);
        res.json(error);
      }
    });
    return router;
  }
}
