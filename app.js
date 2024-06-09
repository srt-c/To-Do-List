// Counters for each page
const counters = {
  important: 1,
  note: 1,
  daily: 1,
  all: 1,
};
document.addEventListener("DOMContentLoaded", () => {
  // Attach an event listener to the 'Add' button
  const addButton = document.getElementById("add-button");
  addButton.addEventListener("click", (event) => {
    // Get the value from the input field
    const input = document.getElementById("input"),
      inputValue = input.value;

    // Check if the todo input is empty
    switch (inputValue) {
      case "":
        alert("Please enter a task.");
        break;
      default:
        // Where to add new task
        const tabPageUlListIds = [
          "important-page",
          "note-page",
          "all-page",
          "daily-page",
        ];
        // Get references to the tab pages
        const [importantPage, notePage, allPage, dailyPage] =
          tabPageUlListIds.map((tabPageUlListIds) => {
            return document.getElementById(tabPageUlListIds);
          });

        // Button IDs of Tab Page
        const buttonIds = [
          "imp-button",
          "note-button",
          "daily-button",
          "all-button",
        ];

        // Map each button ID to its corresponding button element
        const [impButton, noteButton, dailyButton, allButton] = buttonIds.map(
          (id) => {
            return document.getElementById(id);
          }
        );

        // Get the selected category from the dropdown menu
        const category = document.getElementById("category"),
          categoryValue = category.value;

        // Check if categoryValue matches one of the known categories
        if (["important", "note", "daily", "all"].includes(categoryValue)) {
          // Dictionary to map category values to their corresponding page elements
          const pages = {
            // Category Title : Tab Page,
            important: importantPage,
            note: notePage,
            daily: dailyPage,
            all: allPage,
          };

          // Add the item to the corresponding page based on categoryValue
          addItemToPage(pages[categoryValue], inputValue, categoryValue);

          // Add the whole items in the allPage
          if (categoryValue !== "all") {
            addItemToPage(allPage, inputValue, "all");
          }

          // Open Tab links-pages
          openPage(impButton, categoryValue);
        }

        // Show the content page
        const contentPage = Object.assign(
          document.getElementById("todo-list-content"),
          {
            className: "",
          }
        );
        Object.assign(contentPage.style, {
          display: "Block",
        });

        //Clear the input value.
        input.value = "";

        //page ids
        // important-page
        // note-page
        // all-page
        // daily-page
        //details ids
        // incomp
        // comp
        // total
        // Update Counted Values
        let pageId;
        let detailsId = "total";
        switch (categoryValue) {
          case "important":
            pageId = "important-page";
            updateDetails(pageId, detailsId);
            break;
          case "all":
            pageId = "all-page";
            updateDetails(pageId, detailsId);
            break;
          case "daily":
            pageId = "daily-page";
            updateDetails(pageId, detailsId);
            break;
          case "note":
            pageId = "note-page";
            updateDetails(pageId, detailsId);
            break;
        }
        break;
    }
  });
});

//  Open tab links
function openPage(event, tabPageId, targetId) {
  //tabpageids
  // important
  // daily
  // all
  // note
  var tabcontent = document.getElementsByClassName("tab-content");
  // Close opening page
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // Open Tab Page
  const page = document.getElementById(tabPageId);
  Object.assign(page.style, {
    display: "block",
  });

  // Change the content page title
  const contentTitle = Object.assign(document.getElementById("content-title"), {
    className: "content-title",
    textContent: tabPageId,
  });
  // Styling
  Object.assign(contentTitle.style, {
    textTransform: "capitalize",
  });

  // Count Total Title
  let pageId;
  let detailsId = "total";

  switch (targetId) {
    case "imp-button":
      pageId = "important-page";
      updateDetails(pageId, detailsId);
      break;
    case "all-button":
      pageId = "all-page";
      updateDetails(pageId, detailsId);
      break;
    case "daily-button":
      pageId = "daily-page";
      updateDetails(pageId, detailsId);
      break;
    case "note-button":
      pageId = "note-page";
      updateDetails(pageId, detailsId);
      break;
  }
}

// Function to Add items to Page
const addItemToPage = (page, inputValue, categoryValue) => {
  // Prepend counter value to inputValue
  const numberedInputValue = `${counters[categoryValue]}. ${inputValue}`;
  counters[categoryValue]++;

  // Everything will be in lineDiv
  const lineDiv = Object.assign(document.createElement("div"), {
    className: "tabPageLayout",
    textContent: numberedInputValue, // Set the new text content
  });

  // Create the delete button div
  const deleteButtonDiv = Object.assign(document.createElement("div"), {
    className: "delete-button",
  });
  // Create span for delete button
  const spanDelete = Object.assign(document.createElement("span"), {
    className: "material-symbols-outlined",
    textContent: "delete",
  });
  // Append span to delete div
  deleteButtonDiv.append(spanDelete);

  // Delete Button Feature
  deleteButtonDiv.addEventListener("click", () => {
    lineDiv.remove();
    counters[categoryValue]--;
  });

  // Create confirm button div
  const confirmButtonDiv = Object.assign(document.createElement("div"), {
    className: "confirm-button",
  });

  // Create confirm span
  const spanConfirm = Object.assign(document.createElement("span"), {
    className: "material-symbols-outlined",
    textContent: "check_circle",
    id: "confirm",
  });

  // Append confirm span to confirm div
  confirmButtonDiv.append(spanConfirm);

  // Confirm Button Feature
  confirmButtonDiv.addEventListener("click", () => {
    lineDiv.classList.toggle("completed");
  });

  // Crate a wrapper div
  const wrapperDiv = Object.assign(document.createElement("div"), {
    className: "wrapper-div",
  });
  // Append button divs to wrapper div
  wrapperDiv.append(deleteButtonDiv, confirmButtonDiv);

  // Append wrapper div to linediv
  lineDiv.appendChild(wrapperDiv);

  // Append line div to the specified page (ul tag)
  page.appendChild(lineDiv);
};

// Function to update value in the Details area
const updateDetails = (pageId, detailsId) => {
  //page ids
  // importanat-page
  // note-page
  // all-page
  // daily-page
  //details ids
  // incomp
  // comp
  // total
  const page = document.getElementById(pageId);
  const countClass = page.querySelectorAll(".tabPageLayout");
  const length = countClass.length; // total value
  const detailsTotal = document.getElementById(detailsId);
  detailsTotal.textContent = length; // total
};
