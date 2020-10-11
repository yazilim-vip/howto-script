import getOptions from "./utils/GetOpts";

import BatchMode from "./mode/BatchMode";
import { Mode } from "./constants/Constant";
import ServiceMode from "./mode/ServiceMode";
import App from "./mode/App";

const options = getOptions();
let app: App;
switch (options.mode) {
  case Mode.SERVICE:
    app = new ServiceMode(options.howtoRootDir, options.port);
    break;
  case Mode.BATCH:
    app = new BatchMode(options.howtoRootDir, options.output);
    break;
  default:
    throw new Error("Unsuppoerted mod :: " + options.mode);
}
app.start();
