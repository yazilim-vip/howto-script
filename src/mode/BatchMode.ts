import { writeFileSync } from 'fs'

import { DEFAULT_BATCH_OUTPUT_FILE } from '../constants/constants'
import generateHowtoAsync from '../service/HowtoServiceAsync'

const BatchMode = (_howtoRootDir: string | null, _output: string = DEFAULT_BATCH_OUTPUT_FILE): void => {
    generateHowtoAsync(_howtoRootDir).then((result) => {
        writeFileSync(_output, JSON.stringify(result))
    })
}

export default BatchMode
