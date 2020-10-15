import { Mode } from "./constants/Constant";
import ServiceMode from "./mode/ServiceMode";
import getOptions from "./utils/GetOpts";

const options = getOptions(Mode.SERVICE);
ServiceMode(options.howtoRootDir, options.port);
