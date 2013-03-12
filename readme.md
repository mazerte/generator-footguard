# Footguard generator

Maintainer: [Mathieu Desvé](https://github.com/mazerte)

Based on [yeoman-generator](https://github.com/yeoman/yeoman-generator/)

## Usage

First make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Then install `generator-footguard`:
```
npm install generator-footguard
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

* [yo server](#server)
* [yo compile](#compile)
* [yo build](#build)
* [yo server-dist](#server-dist)