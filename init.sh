#!/bin/bash

DEFAULT="--dir=/usr/src/app/howto"

echo "/usr/src/app/howto-script-linux-x64 ${HOWTO_ROOT_DIR:-$DEFAULT} ${OPTS}"
/usr/src/app/howto-script-linux-x64 ${HOWTO_ROOT_DIR:-$DEFAULT} ${OPTS} 
