FROM ubuntu:20.04

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY bin/howto-script-linux-x64 ./
COPY init.sh ./

RUN ["chmod", "+x", "./init.sh"]

# If you are building your code for production
# RUN npm ci --only=production

ENTRYPOINT [ "./init.sh"]