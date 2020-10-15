import { writeFileSync } from "fs";

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/database";
import "firebase/auth";

import { DEFAULT_BATCH_OUTPUT_FILE } from "../constants/Constant";
import generateHowtoAsync from "../service/HowtoServiceAsync";

const BatchMode = (
  _howtoRootDir: string | null,
  _output: string = DEFAULT_BATCH_OUTPUT_FILE
): void => {
  generateHowtoAsync(_howtoRootDir).then((result =>{
    writeFileSync(_output, JSON.stringify(result));
  }))
};

export default BatchMode;
