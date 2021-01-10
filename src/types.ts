import { MODE_BATCH, MODE_SERVICE, PROFILE_DEV, PROFILE_PROD } from './constants'

export type Mode = typeof MODE_BATCH | typeof MODE_SERVICE
export type Profile = typeof PROFILE_DEV | typeof PROFILE_PROD

export type ScriptArgTypes = {
    profile: Profile
    port: number
    mode: Mode
    howtoRootDir: string
    output: string
    help: boolean
    mock: boolean
}
