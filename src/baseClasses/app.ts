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
    if (typeof component.onImmeadiate === "function") {
      component.onImmeadiate();
    }
    return component;
  }

  public destroyComponent(component: any) {
    if (typeof component.onDestroy === "function") {
      component.onDestroy();
    }
    this._componentList.splice(this._componentList.indexOf(component), 1);
  }

  public getComponent(dataComponentId: string) {
    let returnValue = null;
    this._componentList.forEach(component => {
      if (component.dataComponentId) {
        if (component.dataComponentId === dataComponentId) {
          returnValue = component;
        }
      }
    });
    return returnValue;
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
