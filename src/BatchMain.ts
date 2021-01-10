import { Mode } from './constants/Constant'
import BatchMode from './mode/BatchMode'
import getOptions from './utils/GetOpts'

const options = getOptions(Mode.BATCH)
BatchMode(options.howtoRootDir, options.output)
