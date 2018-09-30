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
},{"./eventEmitter":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventEmitter_1 = require("./eventEmitter");
class Component extends eventEmitter_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.boundDataMap = new Map();
    }
    attachToDom() {
        this._rawDom = document.querySelector(`[data-component-id='${this.dataComponentId}']`);
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
    addDomEvent(event, dataEventId, callback) {
        this.getElmFromAttr("data-event-id", dataEventId).addEventListener(event, () => {
            callback.apply(this);
        });
    }
    getElmFromAttr(attr, value) {
        return this._rawDom.querySelector(`[${attr}='${value}'`);
    }
}
exports.Component = Component;
},{"./eventEmitter":3}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("../baseClasses/component");
class TransformingNavigation extends component_1.Component {
}
exports.TransformingNavigation = TransformingNavigation;
},{"../baseClasses/component":2}],5:[function(require,module,exports){
"use strict";
// Example file utilizing the library
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const app_1 = require("./baseClasses/app");
const transformingNavigation_1 = require("./components/transformingNavigation");
// Initialize the base app class
const app = new app_1.App();
// Write the sidebar class
class Sidebar extends transformingNavigation_1.TransformingNavigation {
    constructor() {
        super(...arguments);
        // Set the template id
        this.dataComponentId = "sidebar";
    }
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
},{"./baseClasses/app":1,"./components/transformingNavigation":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYmFzZUNsYXNzZXMvYXBwLnRzIiwic3JjL2Jhc2VDbGFzc2VzL2NvbXBvbmVudC50cyIsInNyYy9iYXNlQ2xhc3Nlcy9ldmVudEVtaXR0ZXIudHMiLCJzcmMvY29tcG9uZW50cy90cmFuc2Zvcm1pbmdOYXZpZ2F0aW9uLnRzIiwic3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxpREFBOEM7QUFHOUMsTUFBYSxHQUFJLFNBQVEsMkJBQVk7SUFHbkM7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQUhGLG1CQUFjLEdBQWdCLEVBQUUsQ0FBQztRQUl2QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxlQUFlLENBQUMsU0FBYztRQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyxJQUFJLE9BQU8sU0FBUyxDQUFDLFlBQVksS0FBSyxVQUFVLEVBQUU7WUFDaEQsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVNLGdCQUFnQixDQUFDLFNBQWM7UUFDcEMsSUFBSSxPQUFPLFNBQVMsQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFO1lBQzdDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTSxZQUFZLENBQUMsZUFBdUI7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RyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFDRCxNQUFNO1FBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QixDQUFDO0NBQ0Y7QUFFRCw2QkFBNkI7QUFDN0IsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi9ldmVudEVtaXR0ZXJcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICBwcml2YXRlIF9jb21wb25lbnRMaXN0OiBDb21wb25lbnRbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLl9vbkltbWVkaWF0ZSgpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgdGhpcy5fYWZ0ZXJJbml0KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjcmVhdGVDb21wb25lbnQoY29tcG9uZW50OiBhbnkpIHtcclxuICAgIHRoaXMuX2NvbXBvbmVudExpc3QucHVzaChjb21wb25lbnQpO1xyXG4gICAgaWYgKHR5cGVvZiBjb21wb25lbnQub25JbW1lYWRpYXRlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgY29tcG9uZW50Lm9uSW1tZWFkaWF0ZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXN0cm95Q29tcG9uZW50KGNvbXBvbmVudDogYW55KSB7XHJcbiAgICBpZiAodHlwZW9mIGNvbXBvbmVudC5vbkRlc3Ryb3kgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICBjb21wb25lbnQub25EZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9jb21wb25lbnRMaXN0LnNwbGljZSh0aGlzLl9jb21wb25lbnRMaXN0LmluZGV4T2YoY29tcG9uZW50KSwgMSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q29tcG9uZW50KGRhdGFDb21wb25lbnRJZDogc3RyaW5nKSB7XHJcbiAgICBsZXQgcmV0dXJuVmFsdWUgPSBudWxsO1xyXG4gICAgdGhpcy5fY29tcG9uZW50TGlzdC5mb3JFYWNoKGNvbXBvbmVudCA9PiB7XHJcbiAgICAgIGlmIChjb21wb25lbnQuZGF0YUNvbXBvbmVudElkKSB7XHJcbiAgICAgICAgaWYgKGNvbXBvbmVudC5kYXRhQ29tcG9uZW50SWQgPT09IGRhdGFDb21wb25lbnRJZCkge1xyXG4gICAgICAgICAgcmV0dXJuVmFsdWUgPSBjb21wb25lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpIHtcclxuICAgIC8vIENvbXBvbmVudHMgbmVlZCB0aGUgdHlwZSAnYW55JyBiZWN1YXNlIHRoZXkgd2lsbCBpbmNsdWRlIGFsbCBzb3J0cyBvZiBtZXRob2RzIC8gcHJvcGVydGllcyB0aGF0IGFyZSB1bmtub3duIHRvIHRoZSBlbmdpbmVcclxuICAgIHRoaXMuX2NvbXBvbmVudExpc3QuZm9yRWFjaCgoY29tcG9uZW50OiBhbnkpID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQuYXR0YWNoVG9Eb20gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGNvbXBvbmVudC5hdHRhY2hUb0RvbSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50Lm9uSW5pdCA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgY29tcG9uZW50Lm9uSW5pdCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIFByaXZhdGUgbGlmZWN5Y2xlIGhvb2tzXHJcblxyXG4gIHByaXZhdGUgX29uSW1tZWRpYXRlKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYWZ0ZXJJbml0KCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIi4vZXZlbnRFbWl0dGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICBwdWJsaWMgZGF0YUNvbXBvbmVudElkOiBzdHJpbmc7XHJcbiAgcHVibGljIGJvdW5kRGF0YU1hcDogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgcHJpdmF0ZSBfcmF3RG9tOiBhbnk7XHJcblxyXG4gIHB1YmxpYyBhdHRhY2hUb0RvbSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3Jhd0RvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIGBbZGF0YS1jb21wb25lbnQtaWQ9JyR7dGhpcy5kYXRhQ29tcG9uZW50SWR9J11gXHJcbiAgICApO1xyXG4gICAgbGV0IG91dGVySHRtbCA9IFN0cmluZyh0aGlzLl9yYXdEb20ub3V0ZXJIVE1MKTtcclxuICAgIC8vIENoZWNrIHRoZSBib3VuZERhdGFNYXAgYW5kIHVwZGF0ZSB0aGUgdmFsdWVzXHJcbiAgICB0aGlzLmJvdW5kRGF0YU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGAke2tleX0gPT4gJHt2YWx1ZX1gKTtcclxuICAgICAgY29uc3QgcmVnRXggPSBuZXcgUmVnRXhwKGBcXHtcXHske2tleX1cXH1cXH1gKTtcclxuICAgICAgb3V0ZXJIdG1sID0gb3V0ZXJIdG1sLnJlcGxhY2UocmVnRXgsIHZhbHVlKTtcclxuICAgIH0pO1xyXG4gICAgY29uc29sZS5sb2cob3V0ZXJIdG1sKTtcclxuICAgIHRoaXMuX3Jhd0RvbS5vdXRlckhUTUwgPSBvdXRlckh0bWw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkRG9tRXZlbnQoZXZlbnQ6IHN0cmluZywgZGF0YUV2ZW50SWQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLmdldEVsbUZyb21BdHRyKFwiZGF0YS1ldmVudC1pZFwiLCBkYXRhRXZlbnRJZCkuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgZXZlbnQsXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RWxtRnJvbUF0dHIoYXR0cjogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmF3RG9tLnF1ZXJ5U2VsZWN0b3IoYFske2F0dHJ9PScke3ZhbHVlfSdgKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIEV2ZW50RW1pdHRlciB7XHJcbiAgcHJpdmF0ZSBfZXZlbnRzTWFwOiBNYXA8c3RyaW5nLCBGdW5jdGlvbltdPiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZXZlbnQgQSBzdHJpbmcgdmFsdWUgZm9yIGFuIGV2ZW50IElEXHJcbiAgICogQHBhcmFtIGNhbGxiYWNrIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyB0cmlnZ2VyZWQgd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBvbihldmVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIGxldCBhcnJheTtcclxuICAgIGlmICh0aGlzLl9ldmVudHNNYXAuZ2V0KGV2ZW50KSkge1xyXG4gICAgICBhcnJheSA9IHRoaXMuX2V2ZW50c01hcC5nZXQoZXZlbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXJyYXkgPSBbXTtcclxuICAgIH1cclxuICAgIGFycmF5LnB1c2goY2FsbGJhY2spO1xyXG4gICAgdGhpcy5fZXZlbnRzTWFwLnNldChldmVudCwgYXJyYXkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNhbGxiYWNrcyBpbiB0aGlzIGVtaXQgd2lsbCBiZSBzY29wZWQgdG8gdGhlIGNvbXBvbmVudCB2aWEgdGhlIC5hcHBseSh0aGlzKSBtZXRob2RcclxuICAgKiBAcGFyYW0gZXZlbnQgQSBzdHJpbmcgdmFsdWUgZm9yIGFuIGV2ZW50IElEIHRoYXQgd2lsbCBiZSBlbWl0dGVkXHJcbiAgICovXHJcbiAgcHVibGljIGVtaXQoZXZlbnQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX2V2ZW50c01hcC5nZXQoZXZlbnQpKSB7XHJcbiAgICAgIGNvbnN0IGFycmF5ID0gdGhpcy5fZXZlbnRzTWFwLmdldChldmVudCk7XHJcbiAgICAgIGFycmF5LmZvckVhY2goY2FsbGJhY2sgPT4ge1xyXG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4uL2Jhc2VDbGFzc2VzL2NvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybWluZ05hdmlnYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge31cclxuIiwiLy8gRXhhbXBsZSBmaWxlIHV0aWxpemluZyB0aGUgbGlicmFyeVxyXG5cclxuLy8gRGVwZW5kZW5jaWVzXHJcbmltcG9ydCB7IEFwcCB9IGZyb20gXCIuL2Jhc2VDbGFzc2VzL2FwcFwiO1xyXG5pbXBvcnQgeyBUcmFuc2Zvcm1pbmdOYXZpZ2F0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50cy90cmFuc2Zvcm1pbmdOYXZpZ2F0aW9uXCI7XHJcblxyXG4vLyBJbml0aWFsaXplIHRoZSBiYXNlIGFwcCBjbGFzc1xyXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XHJcblxyXG4vLyBXcml0ZSB0aGUgc2lkZWJhciBjbGFzc1xyXG5jbGFzcyBTaWRlYmFyIGV4dGVuZHMgVHJhbnNmb3JtaW5nTmF2aWdhdGlvbiB7XHJcbiAgLy8gU2V0IHRoZSB0ZW1wbGF0ZSBpZFxyXG4gIHB1YmxpYyBkYXRhQ29tcG9uZW50SWQgPSBcInNpZGViYXJcIjtcclxuICBvbkltbWVhZGlhdGUoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIm9uSW1tZWFkaWF0ZVwiKTtcclxuICAgIHRoaXMuYm91bmREYXRhTWFwLnNldChcImV4YW1wbGVUZXh0XCIsIFwiVGhpcyBpcyBhIHRlc3RcIik7XHJcbiAgfVxyXG4gIG9uSW5pdCgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwib25Jbml0XCIpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gQWRkIHRoZSBjbGFzc2VzIHRvIHRoZSBhcHBcclxuYXBwLmNyZWF0ZUNvbXBvbmVudChuZXcgU2lkZWJhcigpKTtcclxuIl19
