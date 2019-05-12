FROM node

LABEL author="NatMiz" labo="Orchestra" file="Auditor.js"

COPY src /opt/app/

WORKDIR /opt/app/

EXPOSE 2205 3205

RUN npm install

CMD [ "node", "Auditor.js" ]