# &lt;snappy-typer&gt;

A typing element that's easy to use and customize. 0.5kb (brotli).

[Demo](https://codepen.io/kaina/pen/oNqeXrW)

![](https://github.com/kaina-agency/snappy/blob/main/screenshots/snappy-typer.gif?raw=true)

## Why Make Another Typer Element?

I don't know, why are all the other ones so big?

## Installation

Option 1: As a package.

```sh
npm i @snappywc/typer
```

```js
import '@snappywc/typer'
```

Option 2: In your markup.

```html
<script type="module">
	import '//unpkg.com/@snappywc/typer'
</script>
```

## Usage

```html
<snappy-typer
	static="Making our neighborhoods stronger through"
	strings="diversity,equity,inclusion"
	typing-speed="120"
	word-delay="5000"
	next-delay="200"
></snappy-typer>
```

## Customization

The default styles and part selectors for this element were carefully considered to be as minimal and un-opinionated as possible.

### Parts

The following parts are available for styling.

- static (the static text)
- typed (the dynamic text)

Example Use

```css
snappy-typer::part(typed) {
	font-style: italic;
}
```

### CSS Variables

The variables below can be used to customize the caret at the end of the typed text.

```css
  snappy-typer {
    --caret: '|';
    --caret-color: currentcolor;
  }
```
