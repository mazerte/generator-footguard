#!/bin/bash

repo=$(git config --get remote.origin.url)
message=$(git log -1 --pretty=%B)

cd dist
rm -rf .git
git init
git remote add origin $repo
git push origin --delete gh-pages
git checkout -b gh-pages
git add --all
git commit -m "$message"
git push origin gh-pages