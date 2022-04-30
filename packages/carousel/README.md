# &lt;snappy-carousel&gt;

The tiny, no-nonsense carousel that works anywhere.
1.6kb compressed. 0 dependencies.

[Live Demo with Vanilla, React and Vue examples](https://codepen.io/kaicna/pen/PoErQyv)

![](https://github.com/kaina-agency/snappy/blob/main/screenshots/snappy-carousel.png?raw=true)

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
<script type="module" src="https://unpkg.com/@snappywc/carousel@latest/snappy-carousel.min.js"></script>
```

## Usage
Just put a ```<snappy-carousel>``` anywhere in your markup and you're ready to go. This is a native web component and works in React, Vue, Svelte, Angular, and any other platform because all @snappywc packages have 0 dependencies and are built using low-level APIs.

```html
<snappy-carousel>
	<img src="//picsum.photos/seed/1/600/375" />
	<img src="//picsum.photos/seed/2/600/375" />
	<img src="//picsum.photos/seed/3/600/375" />
</snappy-carousel>
```
That's it! Pat yourself on the back and grab a drink!

### Methods
Keep It Simple, Stupid is the @snappywc way. There are no methods to refresh the carousel, any content changes to the main slot will automatically trigger a refresh.

```.prev()```

go to the previous slide

```.next()```

go to the next slide

```.goToSlide(#)```

go to a specific slide at index #

Example
```js
document.querySelector('snappy-carousel#demo').goToSlide(3)
```

## Customization
@snappywc components provide CSS variables, named slots and ::part() CSS selectors for custom styling. This provides greater flexibility than offering dozens of parameters that may or may not accomplish what you need.

For a better idea of how this works, [check out the demos](https://codepen.io/kaicna/pen/PoErQyv)!

### CSS Variables and Defaults
Change the basic layout and behavior of the carousel.
```scss
snappy-carousel {

	// slide width per breakpoint
	--mobile: 100%;
	--tablet: 50%; // >= 768
	--desktop: 33.33%; // >= 1024

	// styling
	--gap: 0;
	--icon-color: currentcolor;
	--arrow-alignment: flex-end; //vertical, flex values
	--arrow-size: 48px;
	--indicator-size: 16px;
}
```

### Slots
Named slots allow you to customize the icons used for the previous button, next button, indicators and active indicators. These can be SVG icons, icons from a font, images, or even a custom component. Total freedom!
- prev-icon
- next-icon
- indicator-icon
- indicator-icon-active

Example
```html
<snappy-carousel>

	<!-- Default slot for slides -->
	<img src="whatever" />
	<img src="whatever" />
	<img src="whatever" />
	
	<!-- Named slots for controls -->
	<svg slot="prev-icon">
		<path d="whatever" />
	</svg>

	<svg slot="next-icon">
		<path d="whatever" />
	</svg>

</snappy-carousel>
```

### Parts
Web components have a bad reupation for being hard to style, but CSS ::part() selectors make it trivial to target anything inside the component's Shadow DOM and do anything you want to it.
- carousel
- track
- indicators
- prev
- next

Example
```scss
snappy-carousel {

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

## So there you have it.
An easy-to-use, fully-featured carousel that you can quickly drop into whatever you're working on and style however you want. No complicated configuration or init functions, just headache-free simplicity. All for less than 2kb.
