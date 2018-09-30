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
  onInit() {
    console.log("HELLO THIS IS SIDEBAR");
  }
}

// Add the classes to the app
app.createComponent(new Sidebar());
