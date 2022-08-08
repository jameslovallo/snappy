# Catalyst

An Options API for Scaffolding Custom Elements.

Catalyst was inspired by the Vue 2 Single File Components and the Options API. It is tiny function that provides a familiar interface to create new custom elements.

[Demo](https://codepen.io/jameslovallo/pen/xxWzjeb)

## Installation

Option 1: As a package.

```sh
npm i catalyst
```

```js
import 'catalyst'
```

Option 2: In your markup.

```html
<script type="module">
  import '//unpkg.com/catalyst'
</script>
```

## Usage

### JavaScript

```js
import catalyst from "https://codepen.io/jameslovallo/pen/oNqyzmx.js";

catalyst({

  /* The name of your new element. */

  name: "staff-card",

  /* Enable or disable Shadow DOM and slots. */

  shadow: true,

  /*
    Define props and assignment handlers.
    Handler functions are primitives or the name of a method as a string.
    Each prop is available at this[prop name], i.e. this.photo.
    Prop definitions are available for later reference at this.props.
  */

  props: {
    name: String,
    role: String,
    photo: String,
    phone: "phoneLink",
    email: "emailLink"
  },

  /*
    Create methods to use throughout your component.
    Methods can be used as prop handlers or in markup, event handlers, or other methods.
    Methods are available at this[prop name], i.e. this.phoneClick
  */

  methods: {
    phoneLink(phone) {
      if (phone) {
        const url = "tel:" + phone.match(/[0-9]+/g).join("");
        return `
          <a href="tel:${url}" title="${phone}" @click="phoneClick">
            ${phoneIcon}  // inline SVG
          </a>
        `;
      } else return "";
    },

    emailLink(email) {
      if (email) {
        return `
          <a href="mailto:${email}" title="${email}">
            ${emailIcon} // inline SVG
          </a>
        `;
      } else return "";
    },

    phoneClick(e) {
      e.preventDefault();
      const message = `Are you sure you want to call ${this.name}? Did you already try text, chat or email?`;
      alert(message);
    }
  },

  /*
    Define template as a function that returns a template literal.
    @click, @mouseover, etc, can be used to assign event handles.
    You may also run arbitrary Javascript in a @ attribute in an arrow function.
    All methods or arrow functions in a @ attribute have access to (e).
    All parts are available at this.parts[part name], i.e. this.parts.details.
  */

  template() {
    return `
      <img part="photo" src="${this.photo}">
      <div part="details">
        <b>${this.name}</b>
        ${this.role}
      </div>
      <div part="contact">
        ${this.phone}
        ${this.email}
      </div>
    `;
  },

  /*
    Define css as a function that returns a template literal.
    Only vanilla CSS is supported.
    SASS support may be added to higher-level framework.
  */

  css() {
    return `
      :host {
        display: grid;
        align-items: center;
        grid-template-columns: 64px 1fr auto;
        max-width: 320px;
        box-shadow: inset 0 0 0 1px rgba(123, 123, 123, 0.5);
        border-radius: .75rem;
        overflow: hidden;
        gap: .5rem;
      }
      [part=photo] {
        display: block;
        height: 64px;
        width: 64px;
        aspect-ratio: 1/1;
        object-fit: contain;
        object-position: center bottom;
      }
      [part=details] {
        display: flex;
        flex-direction: column;
        padding: .5rem;
      }
      [part=contact] {
        display: flex;
        gap: .75rem;
        padding: .5rem;
      }
      [part="contact"] a {
        display: block;
        text-decoration: none;
      }
      [part=contact] svg {
        display: block;
        width: 24px;
      }
    `;
  }

});
```