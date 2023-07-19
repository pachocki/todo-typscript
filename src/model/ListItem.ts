// Define the interface for an Item
export interface Item {
    id: string;
    item: string;
    checked: boolean;
  }
  
  // Define the ListItem class implementing the Item interface
  export default class ListItem implements Item {
    constructor(
      private _id: string = "",
      private _item: string = "",
      private _checked: boolean = false
    ) {}
  
    // Getters and setters for the private properties
    get id(): string {
      return this._id;
    }
    set id(id: string) {
      this._id = id;
    }
    get item(): string {
      return this._item;
    }
    set item(item: string) {
      this._item = item;
    }
    get checked(): boolean {
      return this._checked;
    }
    set checked(checked: boolean) {
      this._checked = checked;
    }
  }