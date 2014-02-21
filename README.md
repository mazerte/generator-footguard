# Generator-School-Report

| Name | Organization | Date | 
|--|--|
| jhtong | NUS | Feb 20, 2014 |

## Introduction

### What exactly is this?

A Yeoman generator for school reports.  Uses the Yeoman toolstack.

Typing LaTeX reports for short school projects is a pain.  Writing Markdown's easy - but you don't get Math.  This generator combines the power of Markdown - with the Math typesetting capability of $$$\LaTeX$$$.

### Why bother?

I needed it for my assignments.

### Installation

`generator-school-report` runs on NodeJS and Ruby.  You'll also need `compass`, `coffee` and `sass`.

Install `grunt`, `grunt-cli`, `bower`, and `yo`, as per the Yeoman framework.  Then run:

	$ npm install -g generator-school-report
	$ mkdir my-first-report && cd $_
	$ yo school-report

To start the server:

	$ grunt server

You've got a Live, printer-friendly school report going!


### Did you say printing?

Yes!  `generator-school-report` comes with a printer-friendly adaptive template.  Margins and colors are printed nicely, as you would in a school report.  Plus, the fonts are paired for you.  Just plug and play.  Yay.


### What's in?

- SASS / SCSS-style stylesheets
- Compass / Bourbon
- A stylesheet that is optimized for print, ready to roll
- Live update - edit your markdown as you go
- Organize your Markdown 


## Quick tutorial

### Headers

| Header | What it does |
| -- | -- |
| `h1` | Main title |
| `h2` | Section title on a new page. |
| `h3` - `h6` | Sub-section titles |

### Markdown refresher

**This is bold text**

**This is italic text**

This contains some inline $$$\frac {a + 3} {b + c}$$$ latex text

An equation can be written as follow:

$$
\begin{align}
a + b &= 3 \\
b &= 3 - a
\end{align}
$$

Writing some `inline code` or perhaps functions:

	function() {
		console.log("hello world");
	}

Oh, and HTML tags are supported as well.

### Where are all 'em Markdown files?

Dive into the `src/markdown/` folder.  These are concatenated at runtime, sorted alphabetically by filename.


## Contribute

Fork this repository at https://github.com/myrtleTree33/generator-school-report

## Credit

- Joel H Tong 
- `jhtong`, `mrytletree33`
- http://joeltong.org/
- File bugs in the bug report thank you.
- Forked from `generator-footguard`
