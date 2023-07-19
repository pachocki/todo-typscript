// Import necessary styles and modules
import "./css/style.css";
import FullList from "./model/fullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./templates/ListTemplate";

// Define the initialization function for the application
const initApp = (): void => {
  // Get the FullList instance and the ListTemplate instance
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  // Get the form element for adding new items to the list
  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;

  // Add an event listener to the form for handling the submission of new items
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault(); // Prevent form submission from reloading the page
    const input = document.getElementById("newItem") as HTMLInputElement; // Get the input field element
    const newEntryText: string = input.value.trim(); // Get the trimmed value from the input field

    if (!newEntryText.length) return; // If the input field is empty or contains only whitespace, return and do nothing

    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 // Generate an item ID by incrementing the ID of the last item in the FullList
      : 1; // If the FullList is empty, start the ID from 1

    const newItem = new ListItem(itemId.toString(), newEntryText); // Create a new ListItem object with the generated ID and the entered text
    fullList.addItem(newItem); // Add the new item to the FullList instance
    template.render(fullList); // Render the updated list with the newly added item using the ListTemplate
    input.value = ""; // Clear the input field after adding the item
  });

  // Get the clearItemsButton element and add an event listener to it for handling clearing the list
  const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement;
  clearItems.addEventListener("click", (): void => {
    fullList.clearList(); // Clear the list by removing all items from the FullList instance
    template.clear(); // Clear the rendered list using the ListTemplate
  });

  fullList.load(); // Load the list from local storage
  template.render(fullList); // Render the list initially using the ListTemplate
};

// Add a DOMContentLoaded event listener to call the initApp function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initApp);