# Composer

An Options API for Scaffolding Custom Elements.

Composer was inspired by the Vue 2 Single File Components and the Options API. It is a tiny function that provides a succinct and familiar interface to compose new custom elements.

[Demo](https://codepen.io/jameslovallo/pen/xxWzjeb)

## Installation

Option 1: As a package.

```sh
npm i @snappywc/composer
```

```js
import '@snappywc/composer'
```

Option 2: In your markup.

```html
<script type="module">
  import '//unpkg.com/@snappywc/composer'
</script>
```

## Usage

### JavaScript

```js
import composer from '//unpkg.com/@snappywc/composer'

composer({
  /* The name of your new element. */

  name: 'staff-card',

  /* Enable or disable Shadow DOM and slots. */

  shadow: true,

  /* Define props and assignment handlers.
    Assignment handlers transform prop data before it is assigned. 
    They can be primitives or the name of a method as a string.
    Each prop is available at this[prop_name], i.e. this.photo.
    Prop definitions are available for later reference at this.props.
  */

  props: {
    name: String,
    role: String,
    photo: String,
    phone: 'phoneLink',
    email: 'emailLink',
  },

  /*
    Create methods to use throughout your component.
    Methods can be used as assignment handlers, in markup, in event handlers, or in other methods.
    Methods are available at this[prop_name], i.e. this.phoneClick().
  */

  methods: {
    phoneLink(phone) {
      if (phone) {
        const url = 'tel:' + phone.match(/[0-9]+/g).join('')
        return `
          <a href="tel:${url}" title="${phone}" @click="phoneClick">
            ${phoneIcon}  // inline SVG
          </a>
        `
      } else return ''
    },

    emailLink(email) {
      if (email) {
        return `
          <a href="mailto:${email}" title="${email}">
            ${emailIcon} // inline SVG
          </a>
        `
      } else return ''
    },

    phoneClick(e) {
      e.preventDefault()
      const message = `Are you sure you want to call ${this.name}? Did you already try text, chat or email?`
      alert(message)
    },
  },

  /*
    Define your template as a function that returns a template literal.
    All parts are available at this.parts[part_name], i.e. this.parts.details.
  */

  template() {
    return `
      <img part="photo" src="${this.photo}">
      <div part="details">
        <b>${this.name}</b>
        ${this.role}
      </div>
      <div part="contact">
        <span part="phone">${this.phone}</span>
        <span part="email">${this.email}</span>
      </div>
    `
  },

  /*
    Define your styles as a function that returns a template literal.
    Only vanilla CSS is supported.
  */

  styles() {
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
    `
  },

  /*
    Run code after the template is set, like assigning event listeners
  */

  ready() {
    this.parts.phone.addEventListener('click', this.phoneClick)
  },
})
```