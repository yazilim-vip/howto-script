import getOptions from "./utils/GetOpts";

import BatchMode from "./mode/BatchMode";
import { Mode } from "./constants/Constant";

const options = getOptions(Mode.BATCH);
new BatchMode(options.howtoRootDir, options.output).start();
