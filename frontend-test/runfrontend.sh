#!/bin/sh

export PORT=$REACT_APP_FRONTEND_PORT
export PATH=$PATH:/app/frontend/.heroku/node/bin:/app/frontend/.heroku/yarn/bin

yarn run next build
yarn start
