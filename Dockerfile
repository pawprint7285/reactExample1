# Dockerfile for React served on Node server Applications
# Version 0.1.0
# Source cloned from: https://tools.lowes.com/stash/projects/D-FRW/repos/recipes/browse/docker/node-applications

# https://tools.lowes.com/confluence/display/AR/Node.js+version
FROM nexus.d.lowes.com:8800/digital/node:8.15.1-alpine

WORKDIR /usr/local/lowes/taxonomy-pres-app

# Copy local directory into workspace
COPY . /usr/local/lowes/taxonomy-pres-app

# Rebuild for Linux node-sass
RUN npm install
RUN npm rebuild node-sass
ADD . /usr/local/lowes/taxonomy-pres-app

# Expose the react app port the webpack-dev-server port
EXPOSE 3000

# max-http-header-size override of the Node.js default to support larger headers as required by Lowes
# https://tools.lowes.com/confluence/display/AR/Node.js+max-http-header-size+research
# CMD ["node", "--max-http-header-size=12288", "."]

# disregard the above 2 lines docs
# now just CMD run on node dev server
# in future in prodction will run CMD npm run build
CMD [ "npm", "start" ]

# add this line just for commit push to build a new image