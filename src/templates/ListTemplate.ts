import FullList from "../model/fullList";

// Define the interface for DOMList
interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

// Define the ListTemplate class that implements the DOMList interface
export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;
  static instance: ListTemplate = new ListTemplate(); // Singleton instance of ListTemplate

  // Private constructor - ensures ListTemplate is a singleton class
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement; // Get the <ul> element with id "listItems"
  }

  // Method to clear the list
  clear(): void {
    this.ul.innerHTML = ""; // Clear the inner HTML of the <ul> element to remove all list items
  }

  // Method to render the list with the provided FullList data
  render(fullList: FullList): void {
    this.clear(); // Clear the list before rendering it

    // Loop through each item in the FullList and create the corresponding DOM elements
    fullList.list.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement; // Create a new <li> element for the list item
      li.className = "item"; // Set the class name for the <li> element

      const check = document.createElement("input") as HTMLInputElement; // Create a new <input> element for the checkbox
      check.type = "checkbox"; // Set the type of the <input> element to "checkbox"
      check.id = item.id; // Set the id attribute of the <input> element to the item's id
      check.tabIndex = 0; // Set the tabindex attribute for accessibility
      check.checked = item.checked; // Set the checked status based on the item's checked property
      li.appendChild(check); // Append the checkbox to the <li> element

      // Add an event listener to the checkbox to handle changes and save the list
      check.addEventListener("change", () => {
        item.checked = !item.checked; // Toggle the checked status of the item
        fullList.save(); // Save the updated list to local storage
      });

      const label = document.createElement("label") as HTMLLabelElement; // Create a new <label> element for the item text
      label.htmlFor = item.id; // Set the "for" attribute to match the checkbox id
      label.textContent = item.item; // Set the text content of the label to the item's text
      li.append(label); // Append the label to the <li> element

      const button = document.createElement("button") as HTMLButtonElement; // Create a new <button> element for the delete button
      button.className = "button"; // Set the class name for the button
      button.textContent = "X"; // Set the text content of the button to "X"
      li.append(button); // Append the button to the <li> element

      // Add an event listener to the button to handle item removal and re-render the list
      button.addEventListener("click", () => {
        fullList.removeItem(item.id); // Remove the item from the FullList
        this.render(fullList); // Re-render the list to reflect the changes
      });

      this.ul.appendChild(li); // Append the <li> element to the <ul> element, creating the list
    });
  }
}