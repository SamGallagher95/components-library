(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventEmitter_1 = require("./eventEmitter");
class App extends eventEmitter_1.EventEmitter {
    constructor() {
        super();
        this._componentList = [];
        this._onImmediate();
        setTimeout(() => {
            this.init();
            this._afterInit();
        });
    }
    createComponent(component) {
        this._componentList.push(component);
        if (typeof component.onImmeadiate === "function") {
            component.onImmeadiate();
        }
        return component;
    }
    destroyComponent(component) {
        if (typeof component.onDestroy === "function") {
            component.onDestroy();
        }
        this._componentList.splice(this._componentList.indexOf(component), 1);
    }
    getComponent(dataComponentId) {
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
    init() {
        // Components need the type 'any' becuase they will include all sorts of methods / properties that are unknown to the engine
        this._componentList.forEach((component) => {
            if (typeof component.attachToDom === "function") {
                component.attachToDom();
            }
            if (typeof component.onInit === "function") {
                component.onInit();
            }
        });
    }
    // Private lifecycle hooks
    _onImmediate() {
        document.querySelector("body").style.display = "none";
    }
    _afterInit() {
        document.querySelector("body").style.display = "block";
    }
}
exports.App = App;
},{"./eventEmitter":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = require("./element");
class Component extends element_1.Element {
    constructor(dataComponentId) {
        super(dataComponentId, true);
        this.elementMap = new Map();
        this.boundDataMap = new Map();
        this.dataComponentId = dataComponentId;
    }
    attachToDom() {
        let outerHtml = String(this.rawDom.outerHTML);
        // Check the boundDataMap and update the values
        this.boundDataMap.forEach((value, key) => {
            console.log(`${key} => ${value}`);
            const regEx = new RegExp(`\{\{${key}\}\}`);
            outerHtml = outerHtml.replace(regEx, value);
        });
        this.rawDom.outerHTML = outerHtml;
    }
    addDomEvent(event, dataEventId, callback) {
        this.getElmFromAttr("data-event-id", dataEventId).addEventListener(event, () => {
            callback.apply(this);
        });
    }
    createElement(id) {
        const element = new element_1.Element(id, false, this.rawDom);
        this.elementMap.set(id, element);
        return element;
    }
}
exports.Component = Component;
},{"./element":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventEmitter_1 = require("./eventEmitter");
class Element extends eventEmitter_1.EventEmitter {
    constructor(id, isComponent, parentDom) {
        super();
        if (isComponent) {
            this.rawDom = this.getElmFromAttrDOCUMENT("data-component-id", id);
        }
        else {
            this.rawDom = parentDom;
            this.rawDom = this.getElmFromAttr("data-element-id", id);
        }
    }
    getElmFromAttrDOCUMENT(attr, value) {
        return document.querySelector(`[${attr}='${value}'`);
    }
    getElmFromAttr(attr, value) {
        return this.rawDom.querySelector(`[${attr}='${value}'`);
    }
    // Setting Attributes
    addClass(className) {
        this.rawDom.classList.add(className);
    }
}
exports.Element = Element;
},{"./eventEmitter":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventEmitter {
    constructor() {
        this._eventsMap = new Map();
    }
    /**
     *
     * @param event A string value for an event ID
     * @param callback A callback function that is triggered when the event is emitted
     */
    on(event, callback) {
        let array;
        if (this._eventsMap.get(event)) {
            array = this._eventsMap.get(event);
        }
        else {
            array = [];
        }
        array.push(callback);
        this._eventsMap.set(event, array);
    }
    /**
     * The callbacks in this emit will be scoped to the component via the .apply(this) method
     * @param event A string value for an event ID that will be emitted
     */
    emit(event) {
        if (this._eventsMap.get(event)) {
            const array = this._eventsMap.get(event);
            array.forEach(callback => {
                callback.apply(this);
            });
        }
    }
}
exports.EventEmitter = EventEmitter;
},{}],5:[function(require,module,exports){
"use strict";
// Example file utilizing the library
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const app_1 = require("./baseClasses/app");
const component_1 = require("./baseClasses/component");
// Initialize the base app class
const app = new app_1.App();
class TestComponent extends component_1.Component {
    constructor() {
        super(...arguments);
        this.myDiv = this.createElement("myDiv");
    }
    onImmeadiate() {
        this.myDiv.addClass("testClass");
    }
}
app.createComponent(new TestComponent("testComponent"));
},{"./baseClasses/app":1,"./baseClasses/component":2}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYmFzZUNsYXNzZXMvYXBwLnRzIiwic3JjL2Jhc2VDbGFzc2VzL2NvbXBvbmVudC50cyIsInNyYy9iYXNlQ2xhc3Nlcy9lbGVtZW50LnRzIiwic3JjL2Jhc2VDbGFzc2VzL2V2ZW50RW1pdHRlci50cyIsInNyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsaURBQThDO0FBRzlDLE1BQWEsR0FBSSxTQUFRLDJCQUFZO0lBR25DO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFIRixtQkFBYyxHQUFnQixFQUFFLENBQUM7UUFJdkMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sZUFBZSxDQUFDLFNBQWM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEMsSUFBSSxPQUFPLFNBQVMsQ0FBQyxZQUFZLEtBQUssVUFBVSxFQUFFO1lBQ2hELFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUMxQjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxTQUFjO1FBQ3BDLElBQUksT0FBTyxTQUFTLENBQUMsU0FBUyxLQUFLLFVBQVUsRUFBRTtZQUM3QyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU0sWUFBWSxDQUFDLGVBQXVCO1FBQ3pDLElBQUksV0FB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QUM7U0FDcEM7YUFBTTtZQUNMLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDWjtRQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxJQUFJLENBQUMsS0FBYTtRQUN2QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3ZCLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Q0FDRjtBQS9CRCxvQ0ErQkM7OztBQy9CRCxxQ0FBcUM7O0FBRXJDLGVBQWU7QUFDZiwyQ0FBd0M7QUFDeEMsdURBQW9EO0FBSXBELGdDQUFnQztBQUNoQyxNQUFNLEdBQUcsR0FBRyxJQUFJLFNBQUcsRUFBRSxDQUFDO0FBRXRCLE1BQU0sYUFBYyxTQUFRLHFCQUFTO0lBQXJDOztRQUNTLFVBQUssR0FBWSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBS3RELENBQUM7SUFIQyxZQUFZO1FBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNGO0FBRUQsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIi4vZXZlbnRFbWl0dGVyXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcbiAgcHJpdmF0ZSBfY29tcG9uZW50TGlzdDogQ29tcG9uZW50W10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5fb25JbW1lZGlhdGUoKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgIHRoaXMuX2FmdGVySW5pdCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudDogYW55KSB7XHJcbiAgICB0aGlzLl9jb21wb25lbnRMaXN0LnB1c2goY29tcG9uZW50KTtcclxuICAgIGlmICh0eXBlb2YgY29tcG9uZW50Lm9uSW1tZWFkaWF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIGNvbXBvbmVudC5vbkltbWVhZGlhdGUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveUNvbXBvbmVudChjb21wb25lbnQ6IGFueSkge1xyXG4gICAgaWYgKHR5cGVvZiBjb21wb25lbnQub25EZXN0cm95ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgY29tcG9uZW50Lm9uRGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fY29tcG9uZW50TGlzdC5zcGxpY2UodGhpcy5fY29tcG9uZW50TGlzdC5pbmRleE9mKGNvbXBvbmVudCksIDEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldENvbXBvbmVudChkYXRhQ29tcG9uZW50SWQ6IHN0cmluZykge1xyXG4gICAgbGV0IHJldHVyblZhbHVlID0gbnVsbDtcclxuICAgIHRoaXMuX2NvbXBvbmVudExpc3QuZm9yRWFjaChjb21wb25lbnQgPT4ge1xyXG4gICAgICBpZiAoY29tcG9uZW50LmRhdGFDb21wb25lbnRJZCkge1xyXG4gICAgICAgIGlmIChjb21wb25lbnQuZGF0YUNvbXBvbmVudElkID09PSBkYXRhQ29tcG9uZW50SWQpIHtcclxuICAgICAgICAgIHJldHVyblZhbHVlID0gY29tcG9uZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAvLyBDb21wb25lbnRzIG5lZWQgdGhlIHR5cGUgJ2FueScgYmVjdWFzZSB0aGV5IHdpbGwgaW5jbHVkZSBhbGwgc29ydHMgb2YgbWV0aG9kcyAvIHByb3BlcnRpZXMgdGhhdCBhcmUgdW5rbm93biB0byB0aGUgZW5naW5lXHJcbiAgICB0aGlzLl9jb21wb25lbnRMaXN0LmZvckVhY2goKGNvbXBvbmVudDogYW55KSA9PiB7XHJcbiAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50LmF0dGFjaFRvRG9tID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBjb21wb25lbnQuYXR0YWNoVG9Eb20oKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIGNvbXBvbmVudC5vbkluaXQgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGNvbXBvbmVudC5vbkluaXQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBQcml2YXRlIGxpZmVjeWNsZSBob29rc1xyXG5cclxuICBwcml2YXRlIF9vbkltbWVkaWF0ZSgpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2FmdGVySW5pdCgpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEVsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgRWxlbWVudCB7XHJcbiAgcHVibGljIGRhdGFDb21wb25lbnRJZDogc3RyaW5nO1xyXG4gIHB1YmxpYyBlbGVtZW50TWFwOiBNYXA8c3RyaW5nLCBFbGVtZW50PiA9IG5ldyBNYXAoKTtcclxuICBwdWJsaWMgYm91bmREYXRhTWFwOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcCgpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhQ29tcG9uZW50SWQ6IHN0cmluZykge1xyXG4gICAgc3VwZXIoZGF0YUNvbXBvbmVudElkLCB0cnVlKTtcclxuICAgIHRoaXMuZGF0YUNvbXBvbmVudElkID0gZGF0YUNvbXBvbmVudElkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGF0dGFjaFRvRG9tKCk6IHZvaWQge1xyXG4gICAgbGV0IG91dGVySHRtbCA9IFN0cmluZyh0aGlzLnJhd0RvbS5vdXRlckhUTUwpO1xyXG4gICAgLy8gQ2hlY2sgdGhlIGJvdW5kRGF0YU1hcCBhbmQgdXBkYXRlIHRoZSB2YWx1ZXNcclxuICAgIHRoaXMuYm91bmREYXRhTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coYCR7a2V5fSA9PiAke3ZhbHVlfWApO1xyXG4gICAgICBjb25zdCByZWdFeCA9IG5ldyBSZWdFeHAoYFxce1xceyR7a2V5fVxcfVxcfWApO1xyXG4gICAgICBvdXRlckh0bWwgPSBvdXRlckh0bWwucmVwbGFjZShyZWdFeCwgdmFsdWUpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJhd0RvbS5vdXRlckhUTUwgPSBvdXRlckh0bWw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkRG9tRXZlbnQoZXZlbnQ6IHN0cmluZywgZGF0YUV2ZW50SWQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLmdldEVsbUZyb21BdHRyKFwiZGF0YS1ldmVudC1pZFwiLCBkYXRhRXZlbnRJZCkuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgZXZlbnQsXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjcmVhdGVFbGVtZW50KGlkOiBzdHJpbmcpOiBFbGVtZW50IHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBuZXcgRWxlbWVudChpZCwgZmFsc2UsIHRoaXMucmF3RG9tKTtcclxuICAgIHRoaXMuZWxlbWVudE1hcC5zZXQoaWQsIGVsZW1lbnQpO1xyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCIuL2V2ZW50RW1pdHRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVsZW1lbnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG4gIHB1YmxpYyByYXdEb207XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIGlzQ29tcG9uZW50OiBib29sZWFuLCBwYXJlbnREb20/OiBhbnkpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBpZiAoaXNDb21wb25lbnQpIHtcclxuICAgICAgdGhpcy5yYXdEb20gPSB0aGlzLmdldEVsbUZyb21BdHRyRE9DVU1FTlQoXCJkYXRhLWNvbXBvbmVudC1pZFwiLCBpZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJhd0RvbSA9IHBhcmVudERvbTtcclxuICAgICAgdGhpcy5yYXdEb20gPSB0aGlzLmdldEVsbUZyb21BdHRyKFwiZGF0YS1lbGVtZW50LWlkXCIsIGlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRFbG1Gcm9tQXR0ckRPQ1VNRU5UKGF0dHI6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFske2F0dHJ9PScke3ZhbHVlfSdgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRFbG1Gcm9tQXR0cihhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnJhd0RvbS5xdWVyeVNlbGVjdG9yKGBbJHthdHRyfT0nJHt2YWx1ZX0nYCk7XHJcbiAgfVxyXG5cclxuICAvLyBTZXR0aW5nIEF0dHJpYnV0ZXNcclxuXHJcbiAgcHVibGljIGFkZENsYXNzKGNsYXNzTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnJhd0RvbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBFdmVudEVtaXR0ZXIge1xyXG4gIHByaXZhdGUgX2V2ZW50c01hcDogTWFwPHN0cmluZywgRnVuY3Rpb25bXT4gPSBuZXcgTWFwKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGV2ZW50IEEgc3RyaW5nIHZhbHVlIGZvciBhbiBldmVudCBJRFxyXG4gICAqIEBwYXJhbSBjYWxsYmFjayBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgdHJpZ2dlcmVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWRcclxuICAgKi9cclxuICBwdWJsaWMgb24oZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICBsZXQgYXJyYXk7XHJcbiAgICBpZiAodGhpcy5fZXZlbnRzTWFwLmdldChldmVudCkpIHtcclxuICAgICAgYXJyYXkgPSB0aGlzLl9ldmVudHNNYXAuZ2V0KGV2ZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFycmF5ID0gW107XHJcbiAgICB9XHJcbiAgICBhcnJheS5wdXNoKGNhbGxiYWNrKTtcclxuICAgIHRoaXMuX2V2ZW50c01hcC5zZXQoZXZlbnQsIGFycmF5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjYWxsYmFja3MgaW4gdGhpcyBlbWl0IHdpbGwgYmUgc2NvcGVkIHRvIHRoZSBjb21wb25lbnQgdmlhIHRoZSAuYXBwbHkodGhpcykgbWV0aG9kXHJcbiAgICogQHBhcmFtIGV2ZW50IEEgc3RyaW5nIHZhbHVlIGZvciBhbiBldmVudCBJRCB0aGF0IHdpbGwgYmUgZW1pdHRlZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBlbWl0KGV2ZW50OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9ldmVudHNNYXAuZ2V0KGV2ZW50KSkge1xyXG4gICAgICBjb25zdCBhcnJheSA9IHRoaXMuX2V2ZW50c01hcC5nZXQoZXZlbnQpO1xyXG4gICAgICBhcnJheS5mb3JFYWNoKGNhbGxiYWNrID0+IHtcclxuICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8vIEV4YW1wbGUgZmlsZSB1dGlsaXppbmcgdGhlIGxpYnJhcnlcclxuXHJcbi8vIERlcGVuZGVuY2llc1xyXG5pbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi9iYXNlQ2xhc3Nlcy9hcHBcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vYmFzZUNsYXNzZXMvY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEVsZW1lbnQgfSBmcm9tIFwiLi9iYXNlQ2xhc3Nlcy9lbGVtZW50XCI7XHJcbmltcG9ydCB7IFRyYW5zZm9ybWluZ05hdmlnYXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnRzL3RyYW5zZm9ybWluZ05hdmlnYXRpb25cIjtcclxuXHJcbi8vIEluaXRpYWxpemUgdGhlIGJhc2UgYXBwIGNsYXNzXHJcbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcclxuXHJcbmNsYXNzIFRlc3RDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHB1YmxpYyBteURpdjogRWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudChcIm15RGl2XCIpO1xyXG5cclxuICBvbkltbWVhZGlhdGUoKSB7XHJcbiAgICB0aGlzLm15RGl2LmFkZENsYXNzKFwidGVzdENsYXNzXCIpO1xyXG4gIH1cclxufVxyXG5cclxuYXBwLmNyZWF0ZUNvbXBvbmVudChuZXcgVGVzdENvbXBvbmVudChcInRlc3RDb21wb25lbnRcIikpO1xyXG4iXX0=
