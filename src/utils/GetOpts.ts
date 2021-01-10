import getopts from 'getopts'

import { Profile, DEFAULT_MODE, Mode } from '../constants/Constant'

const getOptions = (mode: Mode | null = null): any => {
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
            mode: Mode[DEFAULT_MODE],
            dir: null,
            output: 'output.json',
            help: false
        }
    })

    const getProfile = (): Profile => {
        const profile = process.env.HOWTO_PROFILE || ''
        switch (profile.toLowerCase()) {
            case 'dev':
                return Profile.DEV
            case 'prod':
                return Profile.PROD
        }
        return Profile.PROD
    }

    const getMode = (): Mode => {
        switch (options.mode.toLowerCase()) {
            case 'batch':
                return Mode.BATCH
            case 'service':
                return Mode.SERVICE
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

        switch (mode) {
            case Mode.BATCH:
                helpMsg = `
  Usage: howto-batch [-d|--dir] [-o|--output] [-h|--help]   

  Options:
    -d  --dir       Root dir that Howto content will be stored. If not supplied, mock data will be used.
    -o  --output    Batch output file (Only needed for BATCH mod) (default: output.json)
    -h  --help      Display this help.
`
                break

            case Mode.SERVICE:
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
        port: options.port,
        mode: getMode(),
        mock: options.dir ? false : true,
        howtoRootDir: options.dir,
        output: options.output
    }
}

export default getOptions
