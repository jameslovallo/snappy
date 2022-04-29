# &lt;snappy-carousel&gt;

The tiny, no-nonsense carousel that works anywhere.
1.6kb compressed. 0 dependencies.

[Live Demo with Vanilla, React and Vue examples](https://codepen.io/kaina/pen/PoErQyv)

## Installation
Option 1: As a package.
```
npm i @snappywc/carousel -P
```
```js
import "@snappywc/carousel";
```
Option 2: In your markup.
```html
<script type="module" src="https://unpkg.com/@snappywc/carousel"></script>
```

## Usage
Just put a ```<snappy-carousel>``` anywhere in your markup and you're ready to go. This works in React, Vue, Svelte, Angular, and any other platform because all @snappywc web components have 0 dependencies and are built using low-level APIs.

## Customization
@snappy components provide named slots to modify internal markup and ::part() CSS selectors for custom styling. This provides greater flexibility than offering dozens of parameters that may or may not accomplish what you need.

For a better idea of how this works, check out the demos!

### Slots
- prev-icon
- next-icon
- indicator-icon
- indicator-icon-active

```html
Using Slots

<snappy-carousel id="custom">

	<!-- Default Slot -->
	<img src="whatever" />
	<img src="whatever" />
	<img src="whatever" />
	
	<!-- Named Slots -->
	<svg slot="prev-icon">
		<path d="whatever" />
	</svg>
	<svg slot="next-icon">
		<path d="whatever" />
	</svg>

</snappy-carousel>
```

### Parts
- carousel
- track
- indicators
- prev
- next
```scss
Using Parts

snappy-carousel#demo {
	&::part(indicators) {
		position: absolute;
		bottom: 0;
		filter: drop-shadow(0 1px 2px black);
	}

	&::part(prev),
	&::part(next) {
		filter: drop-shadow(0 1px 2px black);
	}
}
```

### Variables and Defaults
```scss
// responsiveness
--mobile: 100%;
--tablet: 50%;
--desktop: 33.33%;
// styling
--gap: 0;
--icon-color: currentcolor;
--arrow-alignment: flex-end;
--arrow-size: 48px;
--indicator-size: 16px;
```