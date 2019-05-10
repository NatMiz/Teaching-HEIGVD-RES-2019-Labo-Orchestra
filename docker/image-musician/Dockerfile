FROM node:12.2.0

LABEL author="NatMiz" labo='Orchestra'

COPY src /opt/app/

WORKDIR /opt/app/

RUN npm install

ENTRYPOINT [ "node ", "/opt/app/musician.js"]