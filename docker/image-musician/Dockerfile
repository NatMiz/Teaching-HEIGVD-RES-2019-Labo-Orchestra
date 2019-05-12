FROM node

LABEL author="NatMiz" labo="Orchestra" file="Musician.js"

COPY src /opt/app/

WORKDIR /opt/app/

RUN npm install

ENTRYPOINT [ "node", "Musician.js"]