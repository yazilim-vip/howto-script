import { writeFileSync } from 'fs'

import { MODE_BATCH, MODE_SERVICE } from './constants'
import { Mode, ScriptArgTypes } from './types'
import { generateHowto } from './utils/generateHowTo'
import { getOptions } from './utils/getOptions'
import { WebService } from './WebService'

export * from './models/Category'
export * from './models/HowTo'

export * from './utils/generateHowTo'
export * from './utils/getOptions'
export * from './utils/json2CategoryMapper'

export * from './mockCategory'
export * from './constants'

export const BatchMode = (): void => {
    Main(MODE_BATCH)
}

export const ServiceMode = (): void => {
    Main(MODE_SERVICE)
}

const Main = (mode: Mode | undefined): void => {
    const options = getOptions(mode)

    switch (options.mode) {
        case MODE_SERVICE:
            WebService(options.howtoRootDir, options.port)
            break
        case MODE_BATCH:
            const howtoRootDir = options.howtoRootDir
            const output = options.output
            generateHowto(howtoRootDir).then((result) => {
                writeFileSync(output, JSON.stringify(result))
            })
            break
        default:
            throw new Error('Unsupported mod :: ' + options.mode)
    }
}
