import { Mode } from './constants/constants'
import ServiceMode from './mode/ServiceMode'
import getOptions from './utils/GetOpts'

const options = getOptions(Mode.SERVICE)
ServiceMode(options.howtoRootDir, options.port)
