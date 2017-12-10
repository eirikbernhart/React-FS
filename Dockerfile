FROM node:8

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app



EXPOSE 8080


# start app
CMD ["node", "server.js"]
CMD ["start"]