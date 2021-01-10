import { Mode, Profile } from './types'

export const MODE_BATCH = 'batch'
export const MODE_SERVICE = 'service'
export const DEFAULT_MODE: Mode = MODE_SERVICE

export const PROFILE_DEV = 'dev'
export const PROFILE_PROD = 'prod'
export const DEFAULT_PROFILE: Profile = PROFILE_PROD

// defaults
export const DEFAULT_SERVICE_PORT = 5000
export const DEFAULT_BATCH_OUTPUT_FILE = 'output.json'
