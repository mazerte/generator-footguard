if [ "$TRAVIS_BRANCH" == "master" ]
then
	echo "Deploy test-footguard"
    cd ..
    git clone https://github.com/mazerte/test-footguard.git && cd test-footguard
    rm -r ./* -f
    mkdir node_modules
    ln -s node_modules/generator-footguard ../generator-footguard/
    npm install -g yo grunt-cli bower
    gem install compass
    ls -Flash
    ls -Flash node_modules/
    ls -Flash node_modules/generator-footguard
    yo footguard --no-insight
    # git add --all && git commit -m "ref to build $TRAVIS_BUILD_ID"
else
	echo "Do nothing"
fi