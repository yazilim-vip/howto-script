import getOptions from "./utils/GetOpts";

import BatchMode from "./mode/BatchMode";
import { Mode } from "./constants/Constant";
import ServiceMode from "./mode/ServiceMode";

console.log(process.argv)
const options = getOptions();
switch (options.mode) {
  case Mode.SERVICE:
    ServiceMode(options.howtoRootDir, options.port);
    break;
  case Mode.BATCH:
    BatchMode(options.howtoRootDir, options.output);
    break;
  default:
    throw new Error("Unsupported mod :: " + options.mode);
}
