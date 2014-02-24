<a href="https://github.com/myrtleTree33/generator-school-report"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://github-camo.global.ssl.fastly.net/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>

# School Report

| Name | Organization | Date | 
|--|--|
| jhtong | NUS | Feb 20, 2014 |

## Introduction

### What exactly is this?

Typing LaTeX reports for short school projects is a pain.  Writing Markdown's easy - but you don't get Math.  This generator combines the power of Markdown - with the Math typesetting capability of $$$\LaTeX$$$.

### Why bother?

I needed it for my assignments.


### Installation

`generator-school-report` runs on NodeJS and Ruby.  You'll also need `compass`, `coffee` and `sass`.

Install `grunt`, `grunt-cli`, `bower`, and `yo`, as per the Yeoman framework.  Then run:

```bash
$ npm install -g generator-school-report
$ mkdir my-first-report && cd $_
$ yo school-report
```

To start the server:

```bash
$ grunt server
```

You've got a Live, printer-friendly school report going!

To export it as a ready-to-roll HTML page, do:

```bash
$ grunt
```


### Did you say printing?

Yes!  `generator-school-report` comes with a printer-friendly adaptive template.  Margins and colors are printed nicely, as you would in a school report.  Plus, the fonts are paired for you.  Just plug and play.  Yay.


### What's in?

- SASS / SCSS-style stylesheets
- Compass / Bourbon
- A stylesheet that is optimized for print, ready to roll
- Live update - edit your markdown as you go
- Organize your Markdown 
