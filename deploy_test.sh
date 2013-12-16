if [ "$TRAVIS_BRANCH" == "master" ]
then
	echo "Deploy test-footguard"
    cd ..
    git clone https://github.com/mazerte/test-footguard.git && cd test-footguard
    rm -r ./* -f
    mkdir node_modules
    ln -s ../../generator-footguard/ node_modules/generator-footguard
    
    npm install -g yo grunt-cli bower
    gem install compass

    yo footguard --no-insight

    chmod 600 .travis/deploy_key.pem
    ssh-add .travis/deploy_key.pem
    git add --all && git commit -m "ref to build $TRAVIS_BUILD_ID"
else
	echo "Do nothing"
fi