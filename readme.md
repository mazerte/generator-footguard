# Footguard generator

[![Dependency Status](https://gemnasium.com/mazerte/generator-footguard.png)](https://gemnasium.com/mazerte/generator-footguard)
[![Build Status](https://travis-ci.org/mazerte/generator-footguard.png?branch=master)](https://travis-ci.org/mazerte/generator-footguard)
[![Coverage Status](https://coveralls.io/repos/mazerte/generator-footguard/badge.png?branch=master)](https://coveralls.io/r/mazerte/generator-footguard?branch=master)
[![Code Climate](https://codeclimate.com/github/mazerte/generator-footguard.png)](https://codeclimate.com/github/mazerte/generator-footguard)

[![NPM](https://nodei.co/npm/generator-footguard.png?downloads=true&stars=true)](https://nodei.co/npm/generator-footguard/) 

## Status of generated project

[test-footguard](https://github.com/mazerte/test-footguard/)

[![Dependency Status](https://gemnasium.com/mazerte/test-footguard.png)](https://gemnasium.com/mazerte/test-footguard)
[![Build Status](https://travis-ci.org/mazerte/test-footguard.png?branch=master)](https://travis-ci.org/mazerte/test-footguard)
[![Coverage Status](https://coveralls.io/repos/mazerte/test-footguard/badge.png?branch=master)](https://coveralls.io/r/mazerte/test-footguard?branch=master)

Maintainer: [Mathieu Desvé](https://github.com/mazerte)

Based on [generator-generator](https://github.com/yeoman/generator-generator/)

## Usage

First make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Then install `generator-footguard`:
```
npm install -g generator-footguard
```

Run `yo footguard`, optionally passing an app name:
```
yo footguard
```

## Generators

Available generators:

* [footguard](#app) (aka [footguard:app](#app))
* [footguard:collection](#collection)
* [footguard:model](#model)
* [footguard:helper](#helper)
* [footguard:view](#view)

## Commands

Available commands:

* [grunt server](#server)
* [grunt compile](#compile)
* [grunt build](#build)
* [grunt server-dist](#server-dist)
* [grunt test](#test)
* [grunt server-test](#server-test)

## Code Coverage

Footguard application work with [Code coverage](http://en.wikipedia.org/wiki/Code_coverage). When you run your test with `grunt test`, all CoffeeScript file are builded for coverage with [JSCoverage](http://siliconforks.com/jscoverage/) pattern. You can see [grunt-coffeecov](https://github.com/mazerte/grunt-coffeecov) (Thanks to [Benbria](https://github.com/benbria) for [Coffee-coverage](https://github.com/benbria/coffee-coverage)). The tests are reported by [mocha-phantom-coverage-reporter](https://github.com/mazerte/mocha-phantom-coverage-reporter). This reporter create a `coverage` folder with `coverage.html` for local coverage and `coverage.lcov`.

You can plug this to [Coveralls](https://coveralls.io) it's very simple. Create an account and a project in Coveralls interface, add your project token in `.coveralls.yml`

```yml
repo_token: "TQm8NvgkKF...tmDMfxr8O"
```

And add these lines to `.travis.yml`

```yml
after_success:
  - cat ./coverage/coverage.lcov | ./node_modules/coveralls/bin/coveralls.js src/coffee/app
```

## Deployment

### Github Pages

You can deploy your footguard application to [Github Pages](http://pages.github.com/). For that you have some helper scripts in `scripts` folder.

```shell
grunt build
./scripts/gh-pages.sh
```

This script initialize a new git repository in `build` folder and commit in `gh-pages` branch.

If you want to deploy automaticly with [Travis CI](https://travis-ci.org). Add this to your `.travis.yml` in `after_success` section

```yaml
REPO="https://$GH_USER:$GH_PASSWORD@github.com/user/repository" ./scripts/gh-pages.sh
```

Replace `user` and `repository` by your username and your deploy repository. `gh-pages.sh` use HTTPS authentification, for create secure `GH_USER` and `GH_PASSWORD` use [Travis encrypt](http://about.travis-ci.org/docs/user/encryption-keys/) gem

```shell
gem install travis
travis encrypt GH_USER=username GH_PASSWORD=mypass
```
Add the output in your `.travis.yml`
```
env:
  global:
    - secure: "hc0s49uOKKAlM/np6jCd4il3K0f....PtPSGS7DZA="
```

### Heroku

You can deploy your footguard application to [Heroku](http://heroku.com). For that you have some helper scripts in `scripts` folder.

```shell
grunt build
APP=my-heroku-app  ./scripts/heroku.sh
```

This script initialize a new git repository in `build` folder, commit and push to Heroku repository.

If you want to deploy automaticly with [Travis CI](https://travis-ci.org). Add this to your `.travis.yml` in `after_success` section

```shell
APP=my-heroku-app ./scripts/heroku.sh
```

You must create a SSH Key and transfer this to Heroku and Travis

```shell
ssh-keygen -t rsa -f ~/.ssh/id_heroku
```

**Warning:** don't use password, just tap enter for the passphrase.
Add this key to Heroku: [Managing Your SSH Keys](https://devcenter.heroku.com/articles/keys)

For add SSH Key to Travis, you have a script for that.

```shell
FILE=~/.ssh/id_heroku ./scripts/travis-ssh.sh
```

Copy/Past the output to your `.travis.yml`

```yml
env:
  global:
    - secure: "Mr5Hk9o4/3FDrPS6W7bpkt9DSGvKY3syT.../DunMf4mukYS52rqf7ED3g7qcZNbB8bUB7mw="
    - secure: "F3kKrUnlmoZ/BjIvX9YOiqouP3cfi4QGD...JIMs8Qxv8rQ8q1IKABk/OjXSXQ4uXBIZTaQM="
    - secure: "PNlNhimaNL+b2zW/NARpgZZfy91MShFk/...JEXG7/5Xw8XpRnE7YSYatpmcZEITh6bY5Cak="
    - secure: "OWTu+nJ9tbTnrT3knKRySYfs7L5MUlp0B...lxIzVCmP93+eiWdYlAIqlrQVPTEjwSpFJ1YM="
    - secure: "PYVGN9I+EEb7INgB8vfk31HK9vs7KUK4t...1lMzBZ9QnudmkfhWcntPZ0REBMev93Ubm1Vg="
    - secure: "GB5Ilsb+vIBU9BHI6ecooHaWATYp8HaG8...YnxIbcCcD5A7F5t8jXnt5kNWpDrw6lsNqsr0="
    - secure: "BjCItlrxmuGoS+WPkgKWK5Mx7WwFV74v8...5Teyddh4jr9eEeKd0UyjdjhbKl7UsYb3ZQBM="
    - secure: "SILo9jttohP904KGwRps5zmM3lNjhiju4...lQ/2tAiH4+Gu1wLS64aKXZaddpnkkuNrovcI="
    - secure: "AC8qsl1jSWGFzpYaOjAbjszySIReP9CyM...8G2nuBUZkNG0hWGq+MUADDndvuedrWtAwWwc="
    - secure: "AFuJ5oW7ny/wC/zIC7v9+aRenohlxH1Ze...R2DZgPVBMvJm/BwpMgO5gS5jtXpXKJ9oeNDs="
    - secure: "XlBaCu7CYGwLulmsQKP0ngzCqsKrwDS7G...H72iMgyWCmRDBiVhlKRWxAaTGdcm2J4myXKI="
    - secure: "e+gQtJrsxUxEBK2jW1Z+MKrLlccU/EVHW...GOqXt27Be5hR0BnmqS6ktthTNZw0ZGSJAZn0="
    - secure: "fapYx+8qI8rKOt05FCHoWQ/57xthi0Q56...V4NSbLqgL8j1GXgzqFlWdW1aMUYqrBUrdj8U="
    - secure: "RTZnOGEVz4HP90d3dXrBZ7+u/UK/1H3CK...PRMhtXRsgcKc6pEP3Hixm3N8xerfLBeM8U3E="
    - secure: "F71xdB821SMfgkGAZGAlGw2gd54obTVWN...ul1VaN9Ywpyuj2OM60SHQWmq0b3JmQnDBWes="
    - secure: "STA3wj2WKmnDkvqcpDb73by/Cwqz/1Nsp...01Nq57AV/0nGbdrZlnopNfPSiZfBcDdMFJUM="
    - secure: "ZbSFArUPRXyxdgdix4Apxxg0Z0khLN/zb...7NAcVrBiyyZOJ2PRYB2D2VbeOSJ/2oUYL5Gk="
    - secure: "fBONuwxSqZs89TYZHdkYnHQelNxnexLW+...gS/oZ+ax3D3IuG6ruEwwAN5aMM17W9l7CrPw="
    - secure: "chzc8pAFk9QSx+bUdvkYLdf5+JzLLw6kq...JFmHU5xhEH16Q68/exWyFsSyuWIl7MnXrrJc="
    - secure: "YOUh2JQKsr6XxTlkNyIvxUZRcQt4HOC7x...UrcGW6V/HdwGJ82x+bfoo9ninTod3igyS4hU="
    - secure: "G6Oj2L5yHLSxGZ7GmOHa2s8Z7ChUGJgUF...TVl+JjndvQHOaJgiYtn+fz61GPaxNc1++bVw="
    - secure: "W2cDJ6ACKQQSALnzr1qj6sDHMAY84kMuu...BdGdRSwczwGWX+vnXU3qNtwYb6GwblDJ7PKs="
    - secure: "Hb55+EgFFGw8h+EeoyfuOjBsldmly/i7s...yHCrhSl4/QVWDSpzt4XEGE0bjrwuJGsYRCi8="
```

### Deploy and branches

If you want to deploy your app just after commit the master, you can add these lines:

```yml
after_success:
  - if [[ "$TRAVIS_BRANCH" == "master" ]]; then grunt build; fi
  - BRANCH=master REPO="https://$GH_USER:$GH_PASSWORD@github.com/mazerte/test-footguard" ./scripts/gh-pages.sh
  - BRANCH=master APP=test-footguard ./scripts/heroku.sh
```
