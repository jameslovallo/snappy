# &lt;snappy-tabs&gt;

A typing element that's easy to use and customize. 0.85kb (brotli).

[Demo](https://codepen.io/jameslovallo/pen/jOzvQLg)

## Why Make Another Tab/Accordion Element?

The short answer: accessibility. This component uses only unmodified `<details>` and `<summary>` elements, which are fully semantic and accessible. It's also _tiny_.

## Features

1. Tab and Accordion views using `type="tabs"` or `type="accordion"`.
2. Breakpoint-based view switching using `breakpoint="768px"` (provide unit and value).
3. Floating tab indicator.
4. Directional tab animations.
5. Part selectors for easy customization.

## Installation

Option 1: As a package.

```sh
npm i @snappywc/tabs
```

```js
import '@snappywc/tabs'
```

Option 2: In your markup.

```html
<script type="module">
  import '//unpkg.com/@snappywc/tabs'
</script>
```

## Usage

It's really, _really_ easy.

```html
<snappy-tabs type="tabs">
  <details open> <!--open by default-->
    <summary><h3>Tab 1</h3></summary> <!--will be part="tab"-->
    <div> <!--will be part="panel"-->
      <h4>Panel 1</h4>
      <p>Panel 1 content.</p>
    </div>
  </details>
  <details>
    <summary><h3>Tab 2</h3></summary>
    <div>
      <h4>Panel 2</h4>
      <p>Panel 2 content.</p>
    </div>
  </details>
  <details>
    <summary><h3>Tab 2</h3></summary>
    <div>
      <h4>Panel 2</h4>
      <p>Panel 2 content.</p>
    </div>
  </details>
</snappy-tabs>
```

## Customization

The default styles and part selectors for this element were carefully considered to be as minimal and un-opinionated as possible.

### Parts

The following parts are available for styling.

| Part      | Description                 |
| --------- | --------------------------- |
| tab       | The tab or accordion label. |
| panel     | The tab or accordion panel. |
| indicator | The floating tab indicator. |

Example Use

```css
snappy-tabs::part(tab) {
	text-align: center;
}
snappy-tabs::part(indicator) {
	background: darkslateblue;
}
```
