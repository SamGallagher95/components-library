// Example file utilizing the library

// Dependencies
import { App } from "./baseClasses/app";
import { Component } from "./baseClasses/component";
import { Element } from "./baseClasses/element";
import { TransformingNavigation } from "./components/transformingNavigation";

// Initialize the base app class
const app = new App();

class TestComponent extends Component {
  public myDiv: Element = this.createElement("myDiv");

  onImmeadiate() {}
}

app.createComponent(new TestComponent("testComponent"));
