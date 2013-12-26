#!/bin/bash

if [ -z "$REPO" ]
then
	REPO=$(git config --get remote.origin.url)
else
	author=$(git log -1 --pretty=%an)
	git config --global user.name "$author"
	email=$(git log -1 --pretty=%ae)
	git config --global user.email "$email"
fi
message=$(git log -1 --pretty=%B)

cd dist
rm -rf .git
git init
git remote add origin $REPO > /dev/null 2>&1
git push origin --delete gh-pages > /dev/null 2>&1
git checkout -b gh-pages
git add --all
git commit -m "$message"
git push origin gh-pages > /dev/null 2>&1