#!/usr/bin/env sh

# abort on errors
set -e

# build
# npm run build
yarn build

# clear out old server information
rm -rf api/routes/superhero-database-website
mkdir api/routes/superhero-database-website
mkdir api/routes/superhero-database-website/css
mkdir api/routes/superhero-database-website/js
mkdir api/routes/superhero-database-website/img

#copy dist contents to api
mv dist/index.html api/routes/index.html
mv dist/css/* api/routes/superhero-database-website/css
mv dist/img/* api/routes/superhero-database-website/img
mv dist/js/* api/routes/superhero-database-website/js
mv dist/favicon.ico api/routes/superhero-database-website/favicon.ico

# move to server
cd api

# install dependencies
npm install

# start server
npm start

