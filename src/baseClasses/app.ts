import { EventEmitter } from "./eventEmitter";
import { Component } from "./component";

export class App extends EventEmitter {
  private _componentList: Component[] = [];

  constructor() {
    super();

    setTimeout(() => {
      this.init();
    });
  }

  public createComponent(component: any) {
    this._componentList.push(component);
  }

  private init() {
    // Components need the type 'any' becuase they will include all sorts of methods / properties that are unknown to the engine
    this._componentList.forEach((component: any) => {
      if (typeof component.attachToDom === "function") {
        component.attachToDom();
      }
      if (typeof component.onInit === "function") {
        component.onInit();
      }
    });
  }
}
