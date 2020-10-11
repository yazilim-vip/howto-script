import { writeFileSync } from "fs";

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/database";
import "firebase/auth";

import { DEFAULT_BATCH_OUTPUT_FILE } from "../constants/Constant";
import Category from "../model/Category";
import App from "./App";
import generateHowto from "../service/HowtoService";

const genericErrorHandler = (error: { code: unknown; message: unknown }) => {
  console.log("errorCode", error.code);
  console.log("errorMessage", error.message);
};

export default class BatchMode extends App {
  output: string;
  constructor(
    howtoRootDir: string | null,
    output: string = DEFAULT_BATCH_OUTPUT_FILE
  ) {
    super(howtoRootDir);
    this.output = output;
  }

  protected run(): void {
    const firebaseConfig = {};

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    this.login();
  }

  login = (): void => {
    firebase
      .auth()
      .signInWithEmailAndPassword("<user>", "<pass>")
      .catch(genericErrorHandler)
      .then(this.writeData);
  };

  writeData = (): void => {
    console.log("Login Success!");

    const output = this.output;
    generateHowto(this.howtoRootDir, (result: Category) => {
      writeFileSync(output, JSON.stringify(result));
      firebase
        .database()
        .ref("howto")
        .set(JSON.stringify(result))
        .catch(genericErrorHandler)
        .then(this.signOut);
    });
  };

  signOut = (): void => {
    console.log("Operation Completed!");
    firebase
      .auth()
      .signOut()
      .catch(genericErrorHandler)
      .then(() => {
        console.log("Sign Out Success!");
      });
  };
}
