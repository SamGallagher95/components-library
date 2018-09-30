import { EventEmitter } from "./eventEmitter";

export class Component extends EventEmitter {
  public dataComponentId: string;

  private _rawDom: any;

  public attachToDom(): void {
    this._rawDom = document.querySelector(
      `[data-component-id='${this.dataComponentId}']`
    );
    console.log(this._rawDom);
  }
}
