# &lt;snappy-pagination&gt;

An easy-to use pagination element.

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
<snappy-pagination
  page="1 (defaults to 1)"
  range="2 (pages to show left/right of current page, defaults to 2)"
  total="50 (total number of pages, which can be set via js)"
></snappy-pagination>
```

### Javscript
```js
// 1. query your <snappy-pagination> element
const pagination = document.querySelector("snappy-pagination");

// 2. create your function that will run when the page changes
//    use the element's ".page" property to reference the current page 
const fetchPage = () => {
  fetch(`https://picsum.photos/v2/list?page=${pagination.page}&limit=20`)
    .then((res) => res.json())
    .then((photos) => {
      document.querySelector(".images").innerHTML = photos
        .map((p) => {
          const u = p.download_url.split("/");
          const url = `//${u[2]}/${u[3]}/${u[4]}/300/200.webp`;
          return `<img src="${url}">`;
        })
        .join("");
    });
};

// 3. pass your function into the ".handlePages" method
pagination.handlePages(fetchPage);

fetchPage();
```

## Customization

The default styles and part selectors for this element were carefully considered to be as minimal and un-opinionated as possible.

### Parts

The following parts are available for styling.

- page (each numbered page button)
- current-page (the current page's button)
- prev (the previous page button)
- next (the next page button)

Example Use

```css
snappy-pagination::part(page) {
  color: red;
}
```

### Slots

The following slots are available to customize the element's markup.

- prev (each numbered page button's content)
- next (the current page's button's content)

Example Use

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