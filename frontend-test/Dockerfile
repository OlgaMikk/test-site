FROM node:18-alpine as build
ARG NEXT_HOSTNAME
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN npm install
RUN yarn install --frozen-lockfile

COPY . .
ENV NEXT_HOSTNAME=$NEXT_HOSTNAME
RUN echo ${NEXT_HOSTNAME}

RUN nmp build
RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /dist /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
CMD [ "nginx", "-g", "daemon off;"]
EXPOSE 3000
ENTRYPOINT ./runfrontend.sh
