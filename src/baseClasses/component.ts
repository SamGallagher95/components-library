import { Element } from "./element";

export class Component extends Element {
  public dataComponentId: string;
  public elementMap: Map<string, Element> = new Map();
  public boundDataMap: Map<string, any> = new Map();

  constructor(dataComponentId: string) {
    super(dataComponentId, true);
    this.dataComponentId = dataComponentId;
  }

  public attachToDom(): void {
    let outerHtml = String(this.rawDom.outerHTML);
    // Check the boundDataMap and update the values
    this.boundDataMap.forEach((value, key) => {
      console.log(`${key} => ${value}`);
      const regEx = new RegExp(`\{\{${key}\}\}`);
      outerHtml = outerHtml.replace(regEx, value);
    });
    this.rawDom.outerHTML = outerHtml;
  }

  public addDomEvent(event: string, dataEventId: string, callback: Function) {
    this.getElmFromAttr("data-event-id", dataEventId).addEventListener(
      event,
      () => {
        callback.apply(this);
      }
    );
  }

  public createElement(id: string): Element {
    const element = new Element(id, false, this.rawDom);
    this.elementMap.set(id, element);
    return element;
  }
}
