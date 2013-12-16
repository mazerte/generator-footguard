# Footguard generator

[![Dependency Status](https://gemnasium.com/mazerte/generator-footguard.png)](https://gemnasium.com/mazerte/generator-footguard)
[![Build Status](https://travis-ci.org/mazerte/generator-footguard.png?branch=master)](https://travis-ci.org/mazerte/generator-footguard)
[![Coverage Status](https://coveralls.io/repos/mazerte/generator-footguard/badge.png?branch=master)](https://coveralls.io/r/mazerte/generator-footguard?branch=master)
[![Code Climate](https://codeclimate.com/github/mazerte/generator-footguard.png)](https://codeclimate.com/github/mazerte/generator-footguard)

[![NPM](https://nodei.co/npm/generator-footguard.png?downloads=true&stars=true)](https://nodei.co/npm/generator-footguard/) 

## Status of generated project

[test-footguard](https://github.com/mazerte/test-footguard/)

[![Build Status](https://travis-ci.org/mazerte/test-footguard.png?branch=master)](https://travis-ci.org/mazerte/test-footguard)
[![Dependency Status](https://gemnasium.com/mazerte/test-footguard.png)](https://gemnasium.com/mazerte/test-footguard)

Maintainer: [Mathieu Desvé](https://github.com/mazerte)

Based on [yeoman-generator](https://github.com/yeoman/yeoman-generator/)

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

Finally, install npm and bower dependencies:
```
npm install && bower install --dev
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
