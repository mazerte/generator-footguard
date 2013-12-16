if [ "$TRAVIS_BRANCH" == "master" ]
then
	echo "Deploy test-footguard"
    cd ..

    git config --global user.email "mathieu.desve@me.com"
    git config --global user.name "Mathieu Desvé"
    git clone https://github.com/mazerte/test-footguard.git && cd test-footguard

    rm -r ./* -f
    mkdir node_modules
    ln -s ../../generator-footguard/ node_modules/generator-footguard
    
    npm install -g yo grunt-cli bower
    gem install compass

    yo footguard --no-insight

    git add --all && git commit -m "ref to build $TRAVIS_BUILD_ID"
    git push -fq https://$GH_USER:$GH_PASSWORD@github.com/mazerte/test-footguard master > /dev/null
else
	echo "Do nothing"
fi