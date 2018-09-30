// Example file utilizing the library

// Dependencies
import { App } from "./baseClasses/app";
import { TransformingNavigation } from "./components/transformingNavigation";

// Initialize the base app class
const app = new App();

// Write the sidebar class
class Sidebar extends TransformingNavigation {
  // Set the template id
  public dataComponentId = "sidebar";
  onImmeadiate() {
    console.log("onImmeadiate");
    this.boundDataMap.set("exampleText", "This is a test");
  }
  onInit() {
    console.log("onInit");
  }
}

// Add the classes to the app
app.createComponent(new Sidebar());
