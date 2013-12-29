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

## Deployment

### Github Pages

You can deploy your footguard application to [Github Pages](http://pages.github.com/). For that you have some helper scripts in `scripts` folder.

```shell
grunt build
./scripts/gh-pages.sh
```

This script initialize a new git repository in `build` folder and commit in `gh-pages` branch.

If you want to deploy automaticly with [Travis CI](https://travis-ci.org). Add this to your `.travis.yml`

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
