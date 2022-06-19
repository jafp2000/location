# Common build stage
FROM node:16.13.2-alpine3.15 as common-build-stage

RUN apk add --no-cache python3 make g++
RUN npm install -g npm

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage

RUN chown -R node:node /tmp

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start"]
