#!/bin/bash
if [ ! -z "$BRANCH" ] && [ "$BRANCH" != "$TRAVIS_BRANCH" ]; then
	echo -e "\033[33m Not for this $TRAVIS_BRANCH branch."
	exit 1
fi

if [ ! -z "$TRAVIS" ]
then
	echo "Prepare heroku"
	echo "Host heroku.com" >> ~/.ssh/config
	echo "   StrictHostKeyChecking no" >> ~/.ssh/config
	echo "   CheckHostIP no" >> ~/.ssh/config
	echo "   IdentityFile ~/.ssh/id_rsa" >> ~/.ssh/config
	echo -n $id_rsa_{0..23} >> ~/.ssh/id_rsa_base64
	base64 --decode --ignore-garbage ~/.ssh/id_rsa_base64 > ~/.ssh/id_rsa
	chmod 600 ~/.ssh/id_rsa
	ssh-add ~/.ssh/id_rsa
fi

message=$(git log -1 --pretty=%B)

if [ ! -d "dist" ]; then
	echo -e "\033[31m You must run \"grunt build\" before commit to heroku."
	exit 1
fi

cd dist
rm -rf .git
git init
yes | git remote add heroku "git@heroku.com:$APP.git"
git checkout -b heroku
git add --all
git commit -m "$message"
git push heroku heroku:master -f

cd ..