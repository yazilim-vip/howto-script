import { Mode } from './constants/constants'
import BatchMode from './mode/BatchMode'
import getOptions from './utils/GetOpts'

const options = getOptions(Mode.BATCH)
BatchMode(options.howtoRootDir, options.output)
