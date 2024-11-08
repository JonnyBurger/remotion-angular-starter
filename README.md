# AngularRemotion

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Steps for Remotion

- `npm i remotion @remotion/player @remotion/cli @remotion/tailwind @remotion/zod-types` or other packages you need, take care the versions are equal
- If you use TailwindCSS with Angular, don't forget to update the `tailwind.config.js` to include '.tsx' file endings in the content as well otherwise your styles in React will be removed
- We suggest to create a separated folder for all the remotion/react files, but you're free to choose on your own
- In our example we create a folder "remotion" inside src/app
- Copy all the content of your remotion project (or starter template e.g. HelloWorld) into this new "remotion" folder
- Copy the `remotion.config.ts` over into the root of your project (same level as tailwind.config.js or package.json)
- Now we need to create a wrapper to include React into Angular
- Install `npm i react react-dom zod` and `npm i -D @types/react @types/react-dom`
- Create file `PlayerViewWrapper`
- To use JSX files in Angular you need to update your `tsconfig.json` with `"jsx": "react"` under `compilerOptions`
- Include your new component `<app-player-view [data]="data"/>` where you want
- CHECK THIS! You need to import react in every tsx file
- CHECK THIS! `"skipLibCheck": true` for `Timer` bun-types library missing
- WORKS, BUT MAYBE MORE/BETTER WAYS? get PlayerRef in Angular, to use functions from player
