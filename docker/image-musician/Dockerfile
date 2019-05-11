FROM node:12.2.0

LABEL author="NatMiz" labo="Orchestra" file="Musician.js"

COPY src /opt/app/

WORKDIR /opt/app/

RUN npm install

ENTRYPOINT [ "npm", "start"]