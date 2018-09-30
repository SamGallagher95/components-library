export class EventEmitter {
  private _eventsMap: Map<string, Function[]> = new Map();

  /**
   *
   * @param event A string value for an event ID
   * @param callback A callback function that is triggered when the event is emitted
   */
  public on(event: string, callback: Function): void {
    let array;
    if (this._eventsMap.get(event)) {
      array = this._eventsMap.get(event);
    } else {
      array = [];
    }
    array.push(callback);
    this._eventsMap.set(event, array);
  }

  /**
   * The callbacks in this emit will be scoped to the component via the .apply(this) method
   * @param event A string value for an event ID that will be emitted
   */
  public emit(event: string): void {
    if (this._eventsMap.get(event)) {
      const array = this._eventsMap.get(event);
      array.forEach(callback => {
        callback.apply(this);
      });
    }
  }
}
