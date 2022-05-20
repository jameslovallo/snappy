# &lt;snappy-cloner&gt;

A custom element to create little components on-the-fly. **< 500 bytes** (brotli).

[Demo](https://codepen.io/kaina/pen/poabbbw?editors=0010)

## Use Cases

1. You're working in a totally vanilla context and you just want a quick and easy templating solution.
2. You've built your site in Next or Nuxt or SvelteKit or Remix or whatever, you're authoring content in your headless CMS, and you realize that you need some custom markup that you didn't plan for. Maybe it's a list of store locations, staff members, a unique image/text layout, whatever. You don't want to stop what you're doing to go bloat your codebase with a whole new component, and you don't want to copy all that markup over and over again in your CMS, so you import `<snappy-cloner>` to make a little component on-the-fly.

## Installation

Option 1: As a package.

```sh
npm i @snappywc/cloner
```

```js
import '@snappywc/cloner'
```

Option 2: In your markup.

```html
<script type="module">
  import '//unpkg.com/@snappywc/cloner'
</script>
```

## Features

1. Clone a template using custom prop names.
2. Use with any number of custom templates
3. Advanced conditional rendering.
4. Optional default prop values.
5. Choose to render markup in Shadow DOM or regular DOM.

## Basic Usage

Let's create these staff cards from the [demo](https://codepen.io/kaina/pen/poabbbw?editors=0010).

![](https://raw.githubusercontent.com/kaina-agency/snappy/main/screenshots/snappy-cloner.png)

1. Create a `template` with a unique ID, like this: `<template id="staff">`
2. Add a `props` attribute and add some prop names, like this: `props="name role photo email"`
3. Add markup to your template using your props in moustaches, like this: `<b>{name}</b>`
4. Add `if` attributes for conditional rendering, like this: `<img if="photo"/>` or `<div if="role || description">`
5. For default prop values, just assign them to the template tag, like this: `<template id="staff" role="Clone Trooper">`
6. If you want your styles encapsulated in the Shadow DOM, or if you want to use slots (`<slot>`) in your template, you can enable the Shadow DOM by adding the attribute `shadow` to your template, like this `<template shadow>`.

### Example Code

(Inline CSS removed for clarity.)

```html
<script type="module">
  import '//unpkg.com/@snappywc/cloner'
</script>

<template
  id="staff"
  props="name role email photo"
  photo="https://static.wikia.nocookie.net/star-wars-canon/images/f/f0/PHASE2REX.jpg"
>
  <div>
    <img if="photo" src="{photo}" />
    <span if="name || role">
      <b if="name">{name}</b>
      <small if="role">{role}</small>
    </span>
    <a if="email" href="{email}">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#1976D2">
        <path
          d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
        />
      </svg>
    </a>
  </div>
</template>

<snappy-cloner
  template="staff"
  name="Fatimah Maimunah"
  role="Chief Executive Officer"
  email="#"
  photo="https://bit.ly/3FIADMM"
></snappy-cloner>

<snappy-cloner
  template="staff"
  name="Charlie Gardiner"
  role="Chief Financial Officer"
  email="#"
  photo="https://bit.ly/3L4nYVe"
></snappy-cloner>

<snappy-cloner
  template="staff"
  name="Ashley Fox"
  role="Chief Technical Officer"
  email="#"
  photo="https://bit.ly/3FyBTSk"
></snappy-cloner>

<snappy-cloner
  template="staff"
  name="Areeb Mcgowan"
  role="Chief Operations Officer"
  email="#"
  photo="https://bit.ly/3sv2Kts"
></snappy-cloner>

<snappy-cloner
  template="staff"
  name="Default values!"
  role="Photo prop wasn't set, falls back to template default."
  email="#"
></snappy-cloner>

<snappy-cloner
  template="staff"
  name="Conditional rendering!"
  role="Email prop wasn't set, link was hidden. See 'if' attribute in the template."
></snappy-cloner>
```

Does it get any easier than that? If your answer is _yes_, open an issue or make a pull request!
