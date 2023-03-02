## Static Starter 2023
Vite + Tailwind 3 + Handlebars + Vue 3 SFC + Netlify Deployment + Mockoon

Demo: [https://vite-static-starter.netlify.app](https://vite-static-starter.netlify.app)

Speed up your development with a complete and scalable super simple vite based build system that scaffolds the project for you. Just focus on your code. Provides a consumable mock API to build real world front ends pre-integration.

## Getting Started

### Requirements
1. [NodeJS](https://nodejs.org/en/)
2. [npm](https://www.npmjs.com/get-npm)


### Install

1. Clone this repository
2. Run `npm install`

### Run the project

|                | Task Name                                    | Description                                               | Environment |
| -------------- | :------------------------------------------- | :-------------------------------------------------------- | :---------- |
| :construction: | `npm run dev`                     | Compile dev build, start the server and fake API and watch for changes | Development |
| :factory:      | `npm run build` | Compile production build                                  | Production  |
| :factory:      | `npm run preview` | Compile production build and preview                                  | Production  |


### How to use SVG sprite?

##### Add images

1. `optional` Change color values (`fill` or `stroke`) in your SVG file to `currentColor` to support dynamic color changes.
2. Put SVG file in `src/assets/img/svg-sprite` directory.
3. The code from your SVG file will be included in one svg-sprite and placed in `dist/img/svg-sprite/sprite.svg`

##### SVG tag

```html
<svg aria-hidden="true" class="text-orange-700">
	<use href="/assets/img/svg-sprite.svg#icon-{{FILE-NAME}}" />
</svg>
```

### Todo: Further Vite documentations
