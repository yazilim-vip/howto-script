import getopts from 'getopts'

import { DEFAULT_MODE, DEFAULT_PROFILE, MODE_BATCH, MODE_SERVICE, PROFILE_DEV, PROFILE_PROD } from '../constants'
import { Profile, ScriptArgTypes, Mode } from '../types'

export const getOptions = (preDefinedMode: Mode | undefined): ScriptArgTypes => {
    const options = getopts(process.argv.slice(2), {
        alias: {
            port: 'p',
            mode: 'm',
            dir: 'd',
            output: 'o',
            help: 'h'
        },
        default: {
            port: 5000,
            mode: DEFAULT_MODE,
            dir: null,
            output: 'output.json',
            help: false
        }
    })

    const getProfile = (): Profile => {
        const profile = process.env.HOWTO_PROFILE || ''
        switch (profile.toLowerCase()) {
            case 'dev':
                return PROFILE_DEV
            case 'prod':
                return PROFILE_PROD
        }
        return DEFAULT_PROFILE
    }

    const getMode = (): Mode => {
        console.log(options.mode.toLowerCase())
        switch (options.mode.toLowerCase()) {
            case MODE_BATCH:
                return MODE_BATCH
            case MODE_SERVICE:
                return MODE_SERVICE
            default:
                return DEFAULT_MODE
        }
    }

    const checkErrors = (): boolean => {
        if (typeof options.port !== 'number') {
            return true
        }

        if (typeof options.mode !== 'string') {
            return true
        }

        if (typeof options.output !== 'string') {
            return true
        }

        if (options.dir !== null && typeof options.mode !== 'string') {
            return true
        }

        return false
    }

    const printHelp = () => {
        let helpMsg

        switch (preDefinedMode) {
            case MODE_BATCH:
                helpMsg = `
  Usage: howto-batch [-d|--dir] [-o|--output] [-h|--help]   

  Options:
    -d  --dir       Root dir that Howto content will be stored. If not supplied, mock data will be used.
    -o  --output    Batch output file (Only needed for BATCH mod) (default: output.json)
    -h  --help      Display this help.
`
                break

            case MODE_SERVICE:
                helpMsg = `
  Usage: howto-service [-p|--port] [-d|--dir] [-h|--help]   

  Options:
    -p  --port      Web service port. (Only needed for SERVICE mod) (default: 5000)
    -d  --dir       Root dir that Howto content will be stored. If not supplied, mock data will be used.
    -h  --help      Display this help.
      `
                break

            default:
                helpMsg = `
  Usage: howto-script [-p|--port] [-m|--mode] [-d|--dir] [-o|--output] [-h|--help]   

  Options:
    -p  --port      Web service port. (Only needed for SERVICE mod) (default: 5000)
    -d  --dir       Root dir that Howto content will be stored. If not supplied, mock data will be used.
    -m  --mode      Run mode of application Options:(SERVICE BATCH) (default: SERVICE)
    -o  --output    Batch output file (Only needed for BATCH mod)  (default: output.json)
    -h  --help      Display this help.
      `
                break
        }
        console.warn(helpMsg)
    }

    if (options.help || checkErrors()) {
        printHelp()
        process.exit(0)
    }

    return {
        profile: getProfile(),
        mode: preDefinedMode || getMode(),
        port: options.port,
        mock: options.dir ? false : true,
        howtoRootDir: options.dir,
        output: options.output,
        help: false
    }
}
