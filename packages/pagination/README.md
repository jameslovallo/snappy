# &lt;snappy-pagination&gt;

An easy-to use pagination element. (0.8 kb)

[Demo](https://codepen.io/jameslovallo/pen/bGvvxYK)

![](https://github.com/jameslovallo/snappy/blob/main/screenshots/snappy-pagination.png?raw=true)

## Installation

Option 1: As a package.

```sh
npm i @snappywc/pagination
```

```js
import '@snappywc/pagination'
```

Option 2: In your markup.

```html
<script type="module">
  import '//unpkg.com/@snappywc/pagination'
</script>
```

## Usage

### HTML

```html
<snappy-pagination></snappy-pagination>
```

### JavaScript

```js
// 1: Create a function that will run when the page changes.
const fetchPhotos = (page) => {
  fetch(`https://picsum.photos/v2/list?page=${page}&limit=20`)
    .then((res) => res.json())
    .then((photos) => renderPhotos());
};

// 2: Query your <snappy-pagination> element.
const pagination = document.querySelector("snappy-pagination");

// 3: Run the setup function with the desired options
pagination.setup({total: 50})

// 4: Listen for the component's `page-changed` event
pagination.addEventListener("page-changed", (e) => {
  // 4.1 pass e.detail.page to your function
  fetchPhotos(e.detail.page);
});

fetchPhotos(1);
```

## Customization

The default styles and part selectors for this element were carefully considered to be as minimal and un-opinionated as possible.

### Parts

The following parts are available for styling.

| name | description |
| - | - |
| page | each numbered page button |
| current-page | the current page's button |
| prev | the previous page button |
| next | the next page button |

**Example Use**

```css
snappy-pagination::part(page) {
  color: red;
  font-weight: bold;
}
```

### Slots

The following slots are available to customize the element's markup.

| name | description | default |
| - | - | - |
| prev | the previous button's content | ❮ |
| next | the next button's content | ❯ |
| ellipsis | shown between pages | ... |

**Example Use**

```html
<snappy-pagination total="50" range="2">
  <svg slot="prev" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
  </svg>
  <svg slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  </svg>
</snappy-pagination>
```