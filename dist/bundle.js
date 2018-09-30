(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventEmitter_1 = require("./eventEmitter");
class App extends eventEmitter_1.EventEmitter {
    constructor() {
        super();
        this._componentList = [];
        setTimeout(() => {
            this.init();
        });
    }
    createComponent(component) {
        this._componentList.push(component);
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
}
exports.App = App;
},{"./eventEmitter":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventEmitter_1 = require("./eventEmitter");
class Component extends eventEmitter_1.EventEmitter {
    attachToDom() {
        this._rawDom = document.querySelector(`[data-component-id='${this.dataComponentId}']`);
        console.log(this._rawDom);
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
    onInit() {
        console.log("HELLO THIS IS SIDEBAR");
    }
}
// Add the classes to the app
app.createComponent(new Sidebar());
},{"./baseClasses/app":1,"./components/transformingNavigation":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYmFzZUNsYXNzZXMvYXBwLnRzIiwic3JjL2Jhc2VDbGFzc2VzL2NvbXBvbmVudC50cyIsInNyYy9iYXNlQ2xhc3Nlcy9ldmVudEVtaXR0ZXIudHMiLCJzcmMvY29tcG9uZW50cy90cmFuc2Zvcm1pbmdOYXZpZ2F0aW9uLnRzIiwic3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxpREFBOEM7QUFHOUMsTUFBYSxHQUFJLFNBQVEsMkJBQVk7SUFHbkM7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQUhGLG1CQUFjLEdBQWdCLEVBQUUsQ0FBQztRQUt2QyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sZUFBZSxDQUFDLFNBQWM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVPLElBQUk7UUFDViw0SEFBNEg7UUFDNUgsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFjLEVBQUUsRUFBRTtZQUM3QyxJQUFJLE9BQU8sU0FBUyxDQUFDLFdBQVcsS0FBSyxVQUFVLEVBQUU7Z0JBQy9DLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN6QjtZQUNELElBQUksT0FBTyxTQUFTLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtnQkFDMUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ3BCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUExQkQsa0JBMEJDOzs7O0FDN0JELGlEQUE4QztBQUU5QyxNQUFhLFNBQVUsU0FBUSwyQkFBWTtJQUtsQyxXQUFXO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbkMsdUJBQXVCLElBQUksQ0FBQyxlQUFlLElBQUksQ0FDaEQsQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQVhELDhCQVdDOzs7O0FDYkQsTUFBYSxZQUFZO0lBQXpCO1FBQ1UsZUFBVSxHQUE0QixJQUFJLEdBQUcsRUFBRSxDQUFDO0lBOEIxRCxDQUFDO0lBNUJDOzs7O09BSUc7SUFDSSxFQUFFLENBQUMsS0FBYSxFQUFFLFFBQWtCO1FBQ3pDLElBQUksS0FBSyxDQUFDO1FBQ1YsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM5QixLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDWjtRQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxJQUFJLENBQUMsS0FBYTtRQUN2QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3ZCLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Q0FDRjtBQS9CRCxvQ0ErQkM7Ozs7QUMvQkQsd0RBQXFEO0FBRXJELE1BQWEsc0JBQXVCLFNBQVEscUJBQVM7Q0FBRztBQUF4RCx3REFBd0Q7OztBQ0Z4RCxxQ0FBcUM7O0FBRXJDLGVBQWU7QUFDZiwyQ0FBd0M7QUFDeEMsZ0ZBQTZFO0FBRTdFLGdDQUFnQztBQUNoQyxNQUFNLEdBQUcsR0FBRyxJQUFJLFNBQUcsRUFBRSxDQUFDO0FBRXRCLDBCQUEwQjtBQUMxQixNQUFNLE9BQVEsU0FBUSwrQ0FBc0I7SUFBNUM7O1FBQ0Usc0JBQXNCO1FBQ2Ysb0JBQWUsR0FBRyxTQUFTLENBQUM7SUFJckMsQ0FBQztJQUhDLE1BQU07UUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUNGO0FBRUQsNkJBQTZCO0FBQzdCLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIi4vZXZlbnRFbWl0dGVyXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcbiAgcHJpdmF0ZSBfY29tcG9uZW50TGlzdDogQ29tcG9uZW50W10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmluaXQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNyZWF0ZUNvbXBvbmVudChjb21wb25lbnQ6IGFueSkge1xyXG4gICAgdGhpcy5fY29tcG9uZW50TGlzdC5wdXNoKGNvbXBvbmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAvLyBDb21wb25lbnRzIG5lZWQgdGhlIHR5cGUgJ2FueScgYmVjdWFzZSB0aGV5IHdpbGwgaW5jbHVkZSBhbGwgc29ydHMgb2YgbWV0aG9kcyAvIHByb3BlcnRpZXMgdGhhdCBhcmUgdW5rbm93biB0byB0aGUgZW5naW5lXHJcbiAgICB0aGlzLl9jb21wb25lbnRMaXN0LmZvckVhY2goKGNvbXBvbmVudDogYW55KSA9PiB7XHJcbiAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50LmF0dGFjaFRvRG9tID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBjb21wb25lbnQuYXR0YWNoVG9Eb20oKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIGNvbXBvbmVudC5vbkluaXQgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGNvbXBvbmVudC5vbkluaXQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCIuL2V2ZW50RW1pdHRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcbiAgcHVibGljIGRhdGFDb21wb25lbnRJZDogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIF9yYXdEb206IGFueTtcclxuXHJcbiAgcHVibGljIGF0dGFjaFRvRG9tKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fcmF3RG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgYFtkYXRhLWNvbXBvbmVudC1pZD0nJHt0aGlzLmRhdGFDb21wb25lbnRJZH0nXWBcclxuICAgICk7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLl9yYXdEb20pO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcclxuICBwcml2YXRlIF9ldmVudHNNYXA6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uW10+ID0gbmV3IE1hcCgpO1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBldmVudCBBIHN0cmluZyB2YWx1ZSBmb3IgYW4gZXZlbnQgSURcclxuICAgKiBAcGFyYW0gY2FsbGJhY2sgQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIHRyaWdnZXJlZCB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkXHJcbiAgICovXHJcbiAgcHVibGljIG9uKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgbGV0IGFycmF5O1xyXG4gICAgaWYgKHRoaXMuX2V2ZW50c01hcC5nZXQoZXZlbnQpKSB7XHJcbiAgICAgIGFycmF5ID0gdGhpcy5fZXZlbnRzTWFwLmdldChldmVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhcnJheSA9IFtdO1xyXG4gICAgfVxyXG4gICAgYXJyYXkucHVzaChjYWxsYmFjayk7XHJcbiAgICB0aGlzLl9ldmVudHNNYXAuc2V0KGV2ZW50LCBhcnJheSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgY2FsbGJhY2tzIGluIHRoaXMgZW1pdCB3aWxsIGJlIHNjb3BlZCB0byB0aGUgY29tcG9uZW50IHZpYSB0aGUgLmFwcGx5KHRoaXMpIG1ldGhvZFxyXG4gICAqIEBwYXJhbSBldmVudCBBIHN0cmluZyB2YWx1ZSBmb3IgYW4gZXZlbnQgSUQgdGhhdCB3aWxsIGJlIGVtaXR0ZWRcclxuICAgKi9cclxuICBwdWJsaWMgZW1pdChldmVudDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fZXZlbnRzTWFwLmdldChldmVudCkpIHtcclxuICAgICAgY29uc3QgYXJyYXkgPSB0aGlzLl9ldmVudHNNYXAuZ2V0KGV2ZW50KTtcclxuICAgICAgYXJyYXkuZm9yRWFjaChjYWxsYmFjayA9PiB7XHJcbiAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi4vYmFzZUNsYXNzZXMvY29tcG9uZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhbnNmb3JtaW5nTmF2aWdhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7fVxyXG4iLCIvLyBFeGFtcGxlIGZpbGUgdXRpbGl6aW5nIHRoZSBsaWJyYXJ5XHJcblxyXG4vLyBEZXBlbmRlbmNpZXNcclxuaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vYmFzZUNsYXNzZXMvYXBwXCI7XHJcbmltcG9ydCB7IFRyYW5zZm9ybWluZ05hdmlnYXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnRzL3RyYW5zZm9ybWluZ05hdmlnYXRpb25cIjtcclxuXHJcbi8vIEluaXRpYWxpemUgdGhlIGJhc2UgYXBwIGNsYXNzXHJcbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcclxuXHJcbi8vIFdyaXRlIHRoZSBzaWRlYmFyIGNsYXNzXHJcbmNsYXNzIFNpZGViYXIgZXh0ZW5kcyBUcmFuc2Zvcm1pbmdOYXZpZ2F0aW9uIHtcclxuICAvLyBTZXQgdGhlIHRlbXBsYXRlIGlkXHJcbiAgcHVibGljIGRhdGFDb21wb25lbnRJZCA9IFwic2lkZWJhclwiO1xyXG4gIG9uSW5pdCgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiSEVMTE8gVEhJUyBJUyBTSURFQkFSXCIpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gQWRkIHRoZSBjbGFzc2VzIHRvIHRoZSBhcHBcclxuYXBwLmNyZWF0ZUNvbXBvbmVudChuZXcgU2lkZWJhcigpKTtcclxuIl19
