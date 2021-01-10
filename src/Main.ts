import { Mode } from './constants/constants'
import BatchMode from './mode/BatchMode'
import ServiceMode from './mode/ServiceMode'
import getOptions from './utils/GetOpts'

console.log(process.argv)
const options = getOptions()
switch (options.mode) {
    case Mode.SERVICE:
        ServiceMode(options.howtoRootDir, options.port)
        break
    case Mode.BATCH:
        BatchMode(options.howtoRootDir, options.output)
        break
    default:
        throw new Error('Unsupported mod :: ' + options.mode)
}
