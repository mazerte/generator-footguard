#!/bin/bash

cd dist
rm -rf .git
git init
git remote add heroku "git@heroku.com:$APP.git" > /dev/null 2>&1
git push origin --delete heroku > /dev/null 2>&1
git checkout -b heroku
git add --all
git commit -m "$message"
git push heroku heroku:master > /dev/null 2>&1
cd ..