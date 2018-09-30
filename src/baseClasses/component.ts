import { EventEmitter } from "./eventEmitter";

export class Component extends EventEmitter {
  public dataComponentId: string;
  public boundDataMap: Map<string, any> = new Map();

  private _rawDom: any;

  public attachToDom(): void {
    this._rawDom = document.querySelector(
      `[data-component-id='${this.dataComponentId}']`
    );
    let outerHtml = String(this._rawDom.outerHTML);
    // Check the boundDataMap and update the values
    this.boundDataMap.forEach((value, key) => {
      console.log(`${key} => ${value}`);
      const regEx = new RegExp(`\{\{${key}\}\}`);
      outerHtml = outerHtml.replace(regEx, value);
    });
    console.log(outerHtml);
    this._rawDom.outerHTML = outerHtml;
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
