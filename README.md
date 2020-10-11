# howto-script

[![NPM](https://img.shields.io/npm/v/@yazilimvip/howto-script.svg)](https://www.npmjs.com/package/@yazilimvip/howto-script) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-typescript-brightgreen.svg)](https://standardjs.com)


A helper script to genarate JSON from your HowTo Archive. \
Let's assume you have an archive that consists of *.md files as follows

|
|- howto1.md
|- howto2.md
|- cat1
|---- howto3.md
|- cat2
|---- howto4.md

The script will scan all *.md files under that folder recursively and generates following sample JSON:

```json
{
  "name": "",
  "subCategoryList": { 
      "cat1": {
        "name": "cat1",
        "subCategoryList": {},
        "howtoList": { 
          "howto3.md": {
            "categoryList": [],
            "label" : "howto3.md",
            "filePath" : "/<your_howto_directory>/howto3.md",
            "markdownContent" : "<content of md file>"
          }
        },
      },
      "cat2": {
        "name": "cat2",
        "subCategoryList": {},
        "howtoList": { 
          "howto4.md": {
            "categoryList": [],
            "label" : "howto4.md",
            "filePath" : "/<your_howto_directory>/howto4.md",
            "markdownContent" : "<content of md file>"
          }
        },
      },
  },
  "howtoList": { 
    "howto1.md": {
      "categoryList": [],
      "label" : "howto1.md",
      "filePath" : "/<your_howto_directory>/howto1.md",
      "markdownContent" : "<content of md file>"
    },
    "howto2.md": {
      "categoryList": [],
      "label" : "howto2.md",
      "filePath" : "/<your_howto_directory>/howto2.md",
      "markdownContent" : "<content of md file>"
    }
  }
}
```

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

**Docker Image:** https://hub.docker.com/r/yazilimvip/howto-script

**HowTo Service Usage:**
```
docker run -v <host_howto_dir>:/usr/src/app/howto \
  -e OPTS="--mode=service --port=<port>" \
  -p <port>:<port> \
  --name howto-archive yazilimvip/howto-archive:latest
```

## License
MIT © [maemresen](https://github.com/maemresen)
