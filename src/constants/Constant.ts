export enum Profile {
  PROD,
  DEV,
}

export enum Mode {
  BATCH,
  SERVICE
}

// defaults
export const DEFAULT_PROFILE = Profile.PROD; 
export const DEFAULT_MODE = Mode.SERVICE; 

export const DEFAULT_SERVICE_PORT = "5000";

export const DEFAULT_BATCH_OUTPUT_FILE = "output.json"; 