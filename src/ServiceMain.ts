import { Mode } from "./constants/Constant";
import ServiceMode from "./mode/ServiceMode";
import getOptions from "./utils/GetOpts";

const options = getOptions(Mode.SERVICE);
new ServiceMode(options.howtoRootDir, options.port).start();
