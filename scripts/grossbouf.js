


function switchPages(myDisplayedPage, myHiddenPage1, myHiddenPage2) {
  myDisplayedPage.classList.remove("d-none");
  myDisplayedPage.classList.add("d-flex");
  myDisplayedPage.classList.add("flex-column");
  myHiddenPage1.classList.remove("d-flex");
  myHiddenPage1.classList.remove("flex-column");
  myHiddenPage1.classList.add("d-none");
  myHiddenPage2.classList.remove("d-flex");
  myHiddenPage2.classList.remove("flex-column");
  myHiddenPage2.classList.add("d-none");
}

function clickTab(selectedTab, unselectedTab1, unselectedTab2) {
  myDebug ? console.log(`    > Entering 'clickTab', activated via the '${selectedTab}' tab.`) : null;
  let mySelectedTab = document.getElementById(selectedTab)
  let myUnselectedTab1 = document.getElementById(unselectedTab1);
  let myUnselectedTab2 = document.getElementById(unselectedTab2);
  mySelectedTab.classList.add("active");
  myUnselectedTab1.classList.remove("active");
  myUnselectedTab2.classList.remove("active");
  myDebug ? console.log("      > The '" + selectedTab + "' tab has been selected.") : null;
  switch (selectedTab) {
    case "menu":
      switchPages(document.getElementById("menuSection"), document.getElementById("homeSection"), document.getElementById("imageSection"));
      break;
    case "image":
      switchPages(document.getElementById("imageSection"), document.getElementById("homeSection"), document.getElementById("menuSection"));
      break;
    default:
      switchPages(document.getElementById("homeSection"), document.getElementById("menuSection"), document.getElementById("imageSection"));
      break;
  }
  myDebug ? console.log("    > Exiting 'clickTab'") : null;
}

function initHomeSection() {
  myDebug ? console.log("    > Entering 'initHomeSection'.") : null;
  let mySection = document.getElementById("homeSection");
  mySection.style.backgroundImage = "url('./medias/junk_food.jpg')";
  mySection.style.backgroundPosition = "center";
  mySection.style.backgroundRepeat = "no-repeat";
  mySection.style.backgroundSize = "cover";
  mySection.style.width = "100vw";
  mySection.style.height = "80vh";
  myDebug ? console.log("    > Exiting 'initHomeSection'.") : null;
}

function initMenuSection() {
  myDebug ? console.log("    > Entering 'initMenuSection'.") : null;
  let mySection = document.getElementById("menuSection");
  mySection.style.backgroundImage = "url('./medias/junk_menu.jpg')";
  mySection.style.backgroundPosition = "center";
  mySection.style.backgroundRepeat = "no-repeat";
  mySection.style.backgroundSize = "cover";
  mySection.style.height = "80vh";
  let myTitle = document.getElementById("pMenuTitle");
  let myMenu = document.getElementById("pMenuContent");
  myTitle.textContent = "MENU";
  myMenu.textContent = buildMenu();
  myDebug ? console.log("    > Exiting 'initMenuSection'.") : null;
}

function initImageSection() {
  myDebug ? console.log("    > Entering 'initImageSection'.") : null;
  let mySection = document.getElementById("imageSection");
  mySection.style.height = "80vh";
  myDebug ? console.log("    > Exiting 'initImageSection'.") : null;
}

const getRandom = (myDataTab) => myDataTab[Math.floor(Math.random() * myDataTab.length)];

function buildMenu() {
  return `${getRandom(mainCourses)} ${getRandom(techniques)}, with ${getRandom(sides)}, flavored with ${getRandom(seasonings)}. To be eaten with ${getRandom(beverages)}`;
}

function changeMenu() {
  let myMenu = document.getElementById("pMenuContent");
  myMenu.textContent = buildMenu();
}

function showExitIntentPopUp() {
  myDebug ? console.log("    > Entering 'showExitIntentPopUp'.") : null;
  document.getElementById("modalSection").classList.remove("d-none");
  document.getElementById("modalSection").classList.add("d-flex");
  document.getElementById("modalSection").style.zIndex = "10";
  document.getElementById("modalSection").style.position = "absolute";
  myDebug ? console.log("    > Exiting 'showExitIntentPopUp'.") : null;
}

function hideExitIntentPopUp() {
  myDebug ? console.log("    > Entering 'hideExitIntentPopUp'.") : null;
  document.getElementById("modalSection").classList.remove("d-flex");
  document.getElementById("modalSection").classList.add("d-none");
  myDebug ? console.log("    > Exiting 'hideExitIntentPopUp'.") : null;
}

function enableDnD(event) {
  // Do nothing, just activating the draggable objects
}

function startDnD(event) {
  dragged = event.target;
  dragged.style.opacity = "0.5";
}

function endDnD() {
  dragged.style.opacity = "1";
}

function overDnD(event) {
  event.preventDefault();
}

function enterDnD(event) {
  if (event.target.id == "dropzone") {
    event.target.classList.add("bg-warning");
  }
}

function leaveDnD(event) {
  if (event.target.id == "dropzone") {
    event.target.classList.remove("bg-warning");
  }
}

function dropDnD(event) {
  event.preventDefault();
  if (event.target.id == "dropzone") {
    event.target.classList.remove("bg-warning");
    document.getElementById("myDefaultDropzoneText").style.display = "none";
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
  }
}

// Main method using / calling all others
function main() {
  myDebug ? console.log("  > Entering 'main'.") : null;
  initHomeSection();
  initMenuSection();
  initImageSection();
  myDebug ? console.log("    > Adding tabs' management event listeners.") : null;
  document.getElementById("home").addEventListener("click", (event) => clickTab("home", "menu", "image"));
  document.getElementById("menu").addEventListener("click", (event) => clickTab("menu", "home", "image"));
  document.getElementById("image").addEventListener("click", (event) => clickTab("image", "home", "menu"));
  document.getElementById("letibouton").addEventListener("click", changeMenu);
  myDebug ? console.log("    > Adding event listeners managing the 'exit intent' pop-up.") : null;
  document.addEventListener("mouseleave", (event) => showExitIntentPopUp());
  document.getElementById("closeCross").addEventListener("click", (event) => hideExitIntentPopUp());
  document.getElementById("closeButton").addEventListener("click", (event) => hideExitIntentPopUp());
  myDebug ? console.log("    > Adding all drag'n'drop related event listeners.") : null;
  document.addEventListener("drag", enableDnD, false);
  document.addEventListener("dragstart", startDnD, false);
  document.addEventListener("dragend", endDnD, false);
  document.addEventListener("dragover", overDnD, false);
  document.addEventListener("dragenter", enterDnD, false);
  document.addEventListener("dragleave", leaveDnD, false);
  document.addEventListener("drop", dropDnD, false);
  myDebug ? console.log("  > Exiting 'main'.") : null;
}

const mainCourses = ["Bacon cheese burger", "Triple-X Cheddar Burger", "Aligot 5-stage Burger", "Heart Attack Pizza", "1000-cal 10-fold Taco", "French Fondue Savoyarde With Mayonnaise"];
const techniques = ["forgotten 2 weeks outside of the fridge", "minute", "with its Flemish sauce", "façon Sud-Ouest", "Like at my Granny's", "deglazed with Japanese sake", "aged in oak barrels"];
const sides = ["French Fries", "Rice, Potatoes and Chick Peas", "Burnt potatoes", "Belgian Croquettes with Cream and Butter", "Perfectly Rotten Eggs", "Outdated Foie Gras", "Expired and Disqualified Caviar"];
const seasonings = ["Heinz Tomato Ketchup", "French Mayonnaise", "Our famous beaf fat and garlic sauce", "The boss' cum sauce", "Trash can juice"];
const beverages = ["80cl Mountain Dew Bucket", "Extra-sugared Coca-Cola", "French Wine (Individual Jeroboam)", "Direct-from-sewers Water", "Whiskey (2 liters)", "Cheap Vodka (6x75cl)"];

let myDebug = true;
let dragged;
main();




