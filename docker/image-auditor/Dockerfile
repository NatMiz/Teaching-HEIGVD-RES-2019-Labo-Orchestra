FROM node:12.2.0

LABEL author="NatMiz" labo="Orchestra" file="Auditor.js"

COPY src /opt/app/

WORKDIR /opt/app/

EXPOSE 2205

RUN npm install

CMD [ "npm", "start" ]