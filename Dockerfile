# Stage 0, "build-stage"
FROM node:16 as build-stage

WORKDIR /Pneuma

COPY package*.json /Pneuma

RUN npm install

COPY ./ /Pneuma/

RUN npm run-script build

# Stage 1, compiled app serve with NginX
FROM nginx:alpine

COPY --from=build-stage /Pneuma/dist/out /usr/share/nginx/html

COPY --from=build-stage /Pneuma/nginx.conf /etc/nginx/conf.d/default.conf
