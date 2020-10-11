# howto-script

[![NPM](https://img.shields.io/npm/v/@yazilimvip/howto-script.svg)](https://www.npmjs.com/package/@yazilimvip/howto-script) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-typescript-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @yazilimvip/howto-script
```

## Usage
### HowTo Batch
```
  Usage: howto-batch [-d|--dir] [-o|--output] [-h|--help]   

  Options:
    -d  --dir       Root dir that Howto content will be stored. If not supplied, mock data will be used.
    -o  --output    Batch output file (Only needed for BATCH mod) (default: output.json)
    -h  --help      Display this help.
```

### HowTo Service
```
  Usage: howto-service [-p|--port] [-d|--dir] [-h|--help]   

  Options:
    -p  --port      Web service port. (Only needed for SERVICE mod) (default: 5000)
    -d  --dir       Root dir that Howto content will be stored. If not supplied, mock data will be used.
    -h  --help      Display this help.
```

### HowTo Script Docker Image
**HowTo Service Usage:**
```
docker run -v <host_howto_dir>:/usr/src/app/howto \
  -e OPTS="--mode=service \
  --port=<port>" -p <port>:<port> \
  --name howto-archive yazilimvip/howto-archive:latest
```

```
  Options:
    -p  --port      Web service port. (Only needed for SERVICE mod) (default: 5000)
    -m  --mode      Run mode of application Options:(SERVICE BATCH) (default: SERVICE)
    -o  --output    Batch output file (Only needed for BATCH mod)  (default: output.json)
    -h  --help      Display this help.
```

## License

MIT © [maemresen](https://github.com/maemresen)
