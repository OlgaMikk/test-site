FROM node:18-alpine
ARG NEXT_HOSTNAME
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .
ENV NEXT_HOSTNAME=$NEXT_HOSTNAME
RUN echo ${NEXT_HOSTNAME}

RUN yarn build

ENTRYPOINT ./runfrontend.sh
