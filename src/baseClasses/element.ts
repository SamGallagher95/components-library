import { EventEmitter } from "./eventEmitter";

export class Element extends EventEmitter {
  public rawDom;

  constructor(id: string, isComponent: boolean, parentDom?: any) {
    super();
    if (isComponent) {
      this.rawDom = this.getElmFromAttrDOCUMENT("data-component-id", id);
    } else {
      this.rawDom = parentDom;
      this.rawDom = this.getElmFromAttr("data-element-id", id);
    }
  }

  public getElmFromAttrDOCUMENT(attr: string, value: string) {
    return document.querySelector(`[${attr}='${value}'`);
  }

  public getElmFromAttr(attr: string, value: string) {
    return this.rawDom.querySelector(`[${attr}='${value}'`);
  }

  // Setting Attributes

  public addClass(className: string): void {
    this.rawDom.classList.add(className);
  }

  public removeClass(className: string): void {
    this.rawDom.classLIst.remove(className);
  }
}
