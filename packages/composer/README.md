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

Composer allows you create custom elements using an "Options API", similar to Vue 2. Just create an object with the keys below and pass it into composer as the only parameter, i.e. `composer(myObject)`.

| Key       | String   | Example                                            |
| --------- | -------- | -------------------------------------------------- |
| component | String   | 'staff-card'                                       |
| shadow    | Boolean  | true                                               |
| props     | Function | return { name: String }                            |
| ready     | Function | this.parts.name.on('click')                        |
| template  | Function | return \``<span part="name">${this.name}</span>`\` |
| styles    | Function | return \``[part=name] { font-weight: bold; }`\`    |

## Examples

Below are examples for each of the keys in a `composer` object.

- You will notice that other functions are referenced, i.e. `this.phoneLink` or `this.phoneClick`. You can add as many functions as you want to your composer object and use them as prop handlers, in your template, or in event listeners.

### component

The name of your new component. Must follow custom element naming convention.

```js
composer({
  component: 'staff-card',
})
```

### shadow

Whether or not to use the Shadow DOM, which allows you to use slots in your template.

```js
composer({
  shadow: true, // defaults to false
})
```

### props

Get prop data from attributes and assign it using a handler function.

```js
composer({
  props() {
    return {
      name: String,
      role: String,
      photo: String,
      phone: this.phoneLink,
      email: this.emailLink,
    }
  },
})
```

### ready

Code to run after the template is created, i.e. assigning event listeners.

- Note the `on` shorthand function to create listeners for any `part` in the template.

```js
composer({
  ready() {
    this.parts.phone.on('click', this.phoneClick)
  },
})
```

### template

Return a template literal to define the template for your component.

- All `part` attributes are queried and available under `this.parts`.
- You can use `slot` elements if you chose `shadow: true`.

```js
composer({
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
})
```

### styles

Return a template literal containing your component's styles.

```js
composer({
  styles() {
    return `
      :host {
        display: grid;
        align-items: center;
        grid-template-columns: 64px 1fr auto;
        max-width:400px;
        box-shadow: inset 0 0 0 1px rgba(123, 123, 123, 0.5);
        border-radius: .75rem;
        overflow: hidden;
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
        padding: .75rem;
      }
      [part=contact] {
        display: flex;
        gap: .75rem;
        padding: .75rem;
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
})
```
