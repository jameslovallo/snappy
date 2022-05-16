# &lt;snappy-carousel&gt;

The tiny, no-nonsense carousel that works anywhere.
1.9kb (Brotli). 0 Dependencies.

[Demo with Vanilla, React and Vue examples](https://codepen.io/kaicna/pen/PoErQyv)

![](https://github.com/kaina-agency/snappy/blob/main/screenshots/snappy-carousel.png?raw=true)

## Installation

Option 1: As a package.

```sh
npm i @snappywc/carousel
```

```js
import '@snappywc/carousel'
```

Option 2: In your markup.

```html
<script type="module">
	import '//unpkg.com/@snappywc/carousel'
</script>
```

## Usage

Just put a `<snappy-carousel>` anywhere in your markup and you're ready to go. This is a native web component and works in React, Vue, Svelte, Angular, and any other web framework because all @snappywc packages have 0 dependencies and are built using low-level APIs.

```html
<snappy-carousel>
	<img src="//picsum.photos/seed/1/600/375" />
	<img src="//picsum.photos/seed/2/600/375" />
	<img src="//picsum.photos/seed/3/600/375" />
</snappy-carousel>
```

That's it! Pat yourself on the back and grab a drink!

## API

### Carousel Methods

The following methods can be used to control the carousel. Note that there are no methods to manually refresh or re-initialize the carousel: any content changes to the main slot will automatically trigger a refresh.

| Method        | Description              |
| ------------- | ------------------------ |
| .prev()       | go to the previous slide |
| .next()       | go to the next slide     |
| .goToSlide(#) | go to slide at index #   |

### Slide Events

It is a common requirement to execute code when a slide becomes visible or is hidden, perhaps to apply an animation or to support analytics. Each slide provides a pair of events that you can listen for to support these requirements. You can either target an individual slide or loop over every slide in the carousel using the `slides` attribute.

| Event   | Description                 |
| ------- | --------------------------- |
| visible | fired when slide is visible |
| hidden  | fired when slide is hidden  |

An example using `visible` and `hidden` events to apply slide effects.

```js
const carousel = document.querySelector('snappy-carousel#demo')
const specialSlide = carousel.querySelector('.special')

// target a specific slide
specialSlide.addEventListener('visible', () => {
	specialSlide.setAttribute('class', 'animate__animated animate__pulse')
})

specialSlide.addEventListener('hidden', () => {
	specialSlide.setAttribute('class', '')
})

// target every slide
carousel.slides.forEach((slide) => {
	slide.addEventListener('visible', () => {
		console.log(slide)
	})
})
```

## Customization

@snappywc components provide CSS variables, named slots and special CSS selectors for custom styling. This provides greater flexibility than offering dozens of parameters that may or may not accomplish what you need.

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

Pro tip: you can use inline styles on a slotted element to override the color and size variables. There is an example of this in the demo.

- prev-icon
- next-icon
- indicator-icon
- indicator-icon-active

An example using named slots to customize the previous and next icons using inline SVGs.

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

Web components have a reputation for being hard to style, but CSS `::part()` selectors make it trivial to target an element inside the component's Shadow DOM and apply any styling you want to it.

- carousel
- track
- indicators
- prev
- next

A simple example using `::part()` selectors to style the indicators and previous/next buttons.

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

## Accessibility

This should be everyone's first priority when implementing a carousel. I had a blind roommate in college and carousels were the bane of his existence. If you're going to use a carousel, it needs to be done right. @snappywc web components cover all of the basics, including appropriate aria labels, aria roles, and announcing changes to screen readers.

You may have noticed that `<snappy-carousel>` doesn't provide any default support for auto-play. That's because auto-play is terrible for everybody, but especially for users who depend on keyboard navigation or screen readers. That said, if you really need auto-play, you can easily implement it using the `.next()` method. Please be kind to your users and pause auto-play on hover, as in the example below.

```js
// auto-play is evil, but here's how you can do it
const carousel = document.querySelector('snappy-carousel#custom')

carousel.onmouseover = () => {
	carousel.dataset.hovering = true
}

carousel.onmouseleave = () => {
	carousel.dataset.hovering = false
}

setInterval(() => {
	carousel.dataset.hovering !== 'true' && carousel.next()
}, 5000)
```

## So there you have it.

An easy-to-use, fast and accessible carousel that you can quickly use anywhere and style any way you like, all for less than 2kb.
