#!/bin/bash
if [ ! -z "$BRANCH" ] && [ "$BRANCH" != "$TRAVIS_BRANCH" ]; then
	echo -e "\033[33m Not for this $TRAVIS_BRANCH branch."
	exit 1
fi

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

if [ ! -d "dist" ]; then
	echo -e "\033[31m You must run \"grunt build\" before commit to gh-pages."
	exit 1
fi

cd dist
rm -rf .git
git init
git remote add origin $REPO > /dev/null 2>&1
git push origin --delete gh-pages > /dev/null 2>&1
git checkout -b gh-pages
git add --all
git commit -m "$message"
git push origin gh-pages -f > /dev/null 2>&1
cd ..