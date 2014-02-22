## Quick tutorial

### Headers

| Header | What it does |
| -- | -- |
| `h1` | Main title |
| `h2` | Section title on a new page. |
| `h3` - `h6` | Sub-section titles |

### Markdown refresher


*This is italic text*

This contains some inline $$$\frac {a + 3} {b + c}$$$ latex text

An equation can be written as follow:

**Multiline**

$$\begin{eqnarray}
a + b &=& 3 \\\
b &=& 3 - a
\end{eqnarray}$$

*Single line*

$$
F = G \frac {m_1 m_2} {r^2}
$$

Writing some `inline code` or perhaps functions.  If the language is not specified, automatic syntax highlighting is used:

	function() {
		console.log("hello world");
	}

Writing some language-specific code: 

```js
/** Memoization example from 
  * http://www.sitepoint.com/implementing-memoization-in-javascript/
  */
function memoize(func) {
  var memo = {};
  var slice = Array.prototype.slice;

  return function() {
    var args = slice.call(arguments);

    if (args in memo)
      return memo[args];
    else
      return (memo[args] = func.apply(this, args));

  }
}
```

Oh, and HTML tags are supported as well.

### Where are all 'em Markdown files?

Dive into the `src/markdown/` folder.  These are concatenated at runtime, sorted alphabetically by filename.
