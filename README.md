# Components Library

## Quick Start

To use this project you need to setup a project in typescript and use browserify to transpile to javascript. Explaining how to do this is outside of the scope of this project but https://www.typescriptlang.org/docs/handbook/gulp.html is a good place to start.

Before anything you will want to instantiate and App class.

```
import { App } from './components-library/base/app';

const app = new App();
```

It's that easy!

## Using a Prebuilt Component

Now you have a choice. There are prebuilt components that you can use for your web project, or you can extend the Component class and write your own.

For this example we will create a Sidebar that uses the TransformingNavigation component. A full list of prebuilt components will be supplied below.

First step is to get your HTMl ready. Right now the library uses a data-component-id field to find the container of the component.

index.html

```
...
<body>
    <div data-component-id="sidebar">
        ...
    </div>
</body>
```

Now let's get our typescript ready.

```
import { App } from './components-library/base/app';
import { TransformingNavigation } from './components-library/components/transformingNavigation';

const app = new App();

class Sidebar extends TransformingNavigation {

    public dataComponentId = "sidebar";

    onInit() {
        console.log("component created");
    }
}
app.createComponent(new Sidebar());
```

There's more stuff going on here now, let's unpack it.

Our component is a class (class Sidebar to be exact) and simply extends the TransformingNavigation class. This gives your sidebar all of the functionality that the TransformingNavigation component has.

`public dataComponentId` is a property that tells the component what DOM element is needs to bind to. This is a direct reference to the `data-component-id` field we added to the DOM.

`onInit()` is one of several lifecycle hooks that can be used in a component. You would see a console log of 'component created' when starting this example.

`app.createComponent(new Sidebar())` is required to create a new instance of the component for the App. This holds the component in it's memory and fires all of the lifecycle hooks.
