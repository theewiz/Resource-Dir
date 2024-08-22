let createBtn = document.getElementById("create");
let open = document.getElementById("third-section");
let close = document.getElementById("close");
let form = document.getElementById("form");
let websiteName = document.getElementById("website-name");
let websiteLink = document.getElementById("website-link");
let websiteDescription = document.getElementById("website-description");
let secondSection = document.getElementById("second-section");

// secondSection.style.display = `none`;

// The Resources Array
let resource = [];
function resourceArrayLength() {
  if (resource.length === 0) {
    secondSection.style.display = `none`;
    console.log("Empty");
  } else {
    secondSection.style.display = `flex`;
    console.log("Filled");
  }
}

// Open and Close the modal

createBtn.addEventListener("click", openModal);
function openModal() {
  if (open.classList.contains("hide")) {
    open.classList.remove("hide");
  }
}

close.addEventListener("click", closeModal);
function closeModal() {
  if (!open.classList.contains("hide")) {
    open.classList.add("hide");
  }
}

// Collect Form Input & Store in LocalStorage
form.addEventListener("submit", storeInputToLocalStorage);

function storeInputToLocalStorage(e) {
  e.preventDefault();

  let nameOfWebsite = websiteName.value;
  let linkOfWebsite = websiteLink.value;
  let descriptionOfWebsite = websiteDescription.value;

  const resourceObj = {
    nameForWebsite: nameOfWebsite,
    linkForWebsite: linkOfWebsite,
    descriptionForWebsite: descriptionOfWebsite,
  };

  resource.push(resourceObj);
  localStorage.setItem("resources", JSON.stringify(resource));
  form.reset();
  closeModal();
  fetchFromLocalStorage();
}

// Fetch from LocalStorage
function fetchFromLocalStorage() {
  let check = localStorage.getItem("resources");
  if (check) {
    resource = JSON.parse(check);
  }

  resourceArrayLength();
  showResourceOnUI();
  // console.log(resource);
}

fetchFromLocalStorage();

// Show Fetched Resource on UI

function showResourceOnUI() {
  secondSection.innerHTML = " ";

  resource.forEach(function (resourceObj, index) {
    let siteName = resourceObj.nameForWebsite;
    let siteLink = resourceObj.linkForWebsite;
    let siteDescription = resourceObj.descriptionForWebsite;

    // Replace HTML UI
    let resourceContainer = document.createElement("div");
    resourceContainer.classList.add("resource-container");
    resourceContainer.setAttribute("id", `${index}`);

    let theSiteNameDiv = document.createElement("div");
    theSiteNameDiv.classList.add("website-nameBtn");

    let theSiteName = document.createElement("a");
    theSiteName.classList.add("website-name");
    theSiteName.setAttribute("href", siteLink);
    theSiteName.setAttribute("target", "_blank");
    theSiteName.textContent = siteName;

    let trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash");
    trash.setAttribute("id", `${index}`);

    let theDescriptionDiv = document.createElement("div");
    theDescriptionDiv.classList.add("description-container");

    let decriptionText = document.createElement("p");
    decriptionText.textContent = siteDescription;

    theSiteNameDiv.append(theSiteName, trash);
    theDescriptionDiv.append(decriptionText);
    resourceContainer.append(theSiteNameDiv, theDescriptionDiv);
    secondSection.append(resourceContainer);

    resourceContainer.addEventListener("click", function (e) {
      e.preventDefault();
      let target = e.target;
      let parent = target.parentElement.parentElement;
      if (target.className !== "fa-solid fa-trash") return;

      let parentID = Number(parent.id);

      // console.log(target);
      // console.log(parent);
      console.log(parentID);

      if (target.className === "fa-solid fa-trash") {
        deleteResource(parentID);
      }
    });
  });
}

// Delete Items from the Resource List
function deleteResource(parentID) {
  resource = resource.filter(function (resourceObj, index) {
    return index !== parentID;
  });

  resourceArrayLength();
  showResourceOnUI();
}

resourceArrayLength();
showResourceOnUI();
// console.log(resource.length);
