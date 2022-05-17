# &lt;snappy-md&gt;

The little markdown element that can.

[Demo](https://codepen.io/kaina/pen/poayWyg)

## Features

- Anything [marked](https://marked.js.org/) can do
- Code highlighting with [highlight.js](https://highlightjs.org/)
- Custom syntax highlighting themes
- Inject custom styles into the Shadow DOM

## Installation

Option 1: In your markup.

```html
<script>
	import "//unpkg.com/@snappywc/md";
</script>
```

Option 2: As a package.

```sh
npm install @snappywc/md -P
```

```js
import '@snappywc/md'
```

## Usage

### Render a Remote File

```html
<snappy-md src="https://raw.githubusercontent.com/kaina-agency/snappy/main/packages/carousel/README.md"></snappy-md>
```

### Render Inline Markdown

```html
<snappy-md>
	# Heading

	- List item
	- List item

	[A link](https://example.com)
</snappy-md>
```

#### A note about rendering inline code blocks:

It is always unsafe to include unescaped HTML blocks in your page's markup. If you want to highlight an inline code block between &lt;snappy-md&gt; tags, wrap the code in the special html comment **&lt;!--safe ... safe--&gt;**. This will allow you to safely include your code snippet, but it also helps preserve code formatting because prettier and beautify will ignore formatting for HTML comments. The comments will be removed automatically when the code is highlighted, leaving you with a perfect-looking code snippet.

## Styling

&lt;snappy-md&gt; provides a **theme** attribute that you can use to change the syntax highlighting theme. Any highlight.js theme is support, and you can find additional unoffical themes online. You may be wondering why highlight.js instead of Prism.js, and the answer is simple: highlight.js supports many more languages out of the box.

You can also nest a style tag inside the element to pass styles into the Shadow DOM.

### Custom highlight.js Theme

```html
<snappy-md theme="https://unpkg.com/@highlightjs/cdn-assets@11.5.1/styles/night-owl.min.css"></snappy-md>
```

### Injecting a Style Tag

```html
<snappy-md>
	# Heading

	- List item
	- List item

	[A link](https://example.com)
	
	<style>
		h1 {color: blue;}
		ul {color: orange;}
		a {color: green;}
	</style>
</snappy-md>
```

## MDX-Like Components in Markdown

Since [marked](https://marked.js.org/) allows HTML in markdown, and web cumponents work anywhere, you can use custom elements inside your markdown without worrying about compatability with 3rd-party frameworks. It's amazing how simple life can be when you #usetheplatform.

```html
<snappy-md>
	# Weeee, web components in markdown!
			
	- Super easy
	- Works everywhere

	<script type="module">
		import "//unpkg.com/@snappywc/carousel"
	</script>

	<snappy-carousel style="--mobile: 50%; --gap: 8px;">
		<img src="//picsum.photos/seed/1/400/250" />
		<img src="//picsum.photos/seed/2/400/250" />
		<img src="//picsum.photos/seed/3/400/250" />
	</snappy-carousel>
	
	## What a nice carousel
	
	You get the idea.
</snappy-md>
```