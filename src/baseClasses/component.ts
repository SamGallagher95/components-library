import { EventEmitter } from "./eventEmitter";

export class Component extends EventEmitter {
  public dataComponentId: string;

  private _rawDom: any;

  public attachToDom(): void {
    this._rawDom = document.querySelector(
      `[data-component-id='${this.dataComponentId}']`
    );
  }

  public addDomEvent(event: string, dataEventId: string, callback: Function) {
    this.getElmFromAttr("data-event-id", dataEventId).addEventListener(
      event,
      () => {
        callback.apply(this);
      }
    );
  }

  private getElmFromAttr(attr: string, value: string) {
    return this._rawDom.querySelector(`[${attr}='${value}'`);
  }
}
