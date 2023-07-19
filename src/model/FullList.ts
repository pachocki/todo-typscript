import ListItem from "./ListItem";

// Define the List interface with required methods and properties
interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

// Define the FullList class that implements the List interface
export default class FullList implements List {
  // Create a static instance of FullList to ensure singleton pattern
  static instance: FullList = new FullList();

  // Private constructor initializes the _list property with an empty array by default
  private constructor(private _list: ListItem[] = []) {}

  // Getter for the list property
  get list(): ListItem[] {
    return this._list;
  }

  // Method to load list data from local storage
  load(): void {
    // Retrieve the stored list from local storage
    const storedList: string | null = localStorage.getItem("list");

    // If the stored list is not a string (or null), return without doing anything
    if (typeof storedList !== "string") return;

    // Parse the stored list from JSON format into an array of objects
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);

    // Iterate through the parsed list and add each item to the FullList instance
    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      FullList.instance.addItem(newListItem);
    });
  }

  // Method to save the list to local storage
  save(): void {
    localStorage.setItem("list", JSON.stringify(this._list));
  }

  // Method to clear the list by emptying the _list array and saving it
  clearList(): void {
    this._list = [];
    this.save();
  }

  // Method to add an item to the list and save it to local storage
  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  // Method to remove an item from the list by filtering the array and saving it
  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
