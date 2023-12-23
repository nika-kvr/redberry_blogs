// Validate logged in User
if (!localStorage.getItem("loggedInUser")) {
  window.location.href = "index.html";
}

// Select buttons
const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});



//Get categories input
if (localStorage.getItem("categoriesArray")) {
  var selectedCategoriesarr = localStorage
    .getItem("categoriesArray")
    .split(",");
  selectedCategoriesarr = selectedCategoriesarr.map(Number);
} else {
  var selectedCategoriesarr = [];
}


var settings = {
  url: "https://api.blog.redberryinternship.ge/api/categories",
  method: "GET",
  timeout: 0,
};

$.ajax(settings).done(function (response) {
  const categories = response.data;
  const container = $(".categories-border");
  container.hide();

  categories.forEach(function (category) {
    const categorie = $("<div>")
      .text(category.title)
      .addClass("categorie-btn")
      .attr("id", category.id)
      .on("click", function () {
        let newCategorie = $("<div>")
          .text(category.title + " x")
          .addClass("selected-categories")
          .attr("id", category.id)
          .on("click", function () {
            selectedCategoriesarr = selectedCategoriesarr.filter(function (
              element
            ) {
              return element !== category.id;
            });
            localStorage.setItem("categoriesArray", selectedCategoriesarr);
            $(this).remove();
          })
          .css({
            color: category.text_color,
            background: category.background_color,
          });
        if (selectedCategoriesarr.length > 0) {
          if (selectedCategoriesarr.includes(category.id)) {
          } else {
            const selectedCategories = $("#selectedCategories");
            selectedCategories.append(newCategorie);
            selectedCategoriesarr.push(category.id);
            localStorage.setItem("categoriesArray", selectedCategoriesarr);
          }
        } else {
          const selectedCategories = $("#selectedCategories");
          selectedCategories.append(newCategorie);
          selectedCategoriesarr.push(category.id);
          localStorage.setItem("categoriesArray", selectedCategoriesarr);
        }
      })
      .css({
        color: category.text_color,
        background: category.background_color,
      });
    container.append(categorie);
  });
  //get categories from localstorage

  selectedCategoriesarr.forEach((element) => {
    let selectedDiv = document.getElementById(element);
    let selectedcont = document.getElementById("selectedCategories");
    var newDiv = document.createElement("div");
    newDiv.textContent = selectedDiv.textContent;
    newDiv.classList.add("selected-categories");
    var computedStyle = getComputedStyle(selectedDiv);
    var backgroundColor = computedStyle.backgroundColor;
    newDiv.style.backgroundColor  = backgroundColor;
    newDiv.addEventListener("click", function () {
      selectedCategoriesarr = selectedCategoriesarr.filter(function (element) {
        return element !== +selectedDiv.id;
      });
      localStorage.setItem("categoriesArray", selectedCategoriesarr);
      this.remove();
    });
    selectedcont.appendChild(newDiv);
  });
});

// Add listener to a categories div button
$(document).ready(function () {
  $("#categoriesBtnShow").click(function () {
    $(".categories-border").toggle();
  });
});

// Validations
const submitBtn = document.getElementById("submitButton");
const authorInput = document.getElementById("authorInput");

// get data from storage
const form = document.getElementById("myForm");
const inputElements = form.querySelectorAll(".input");
inputElements.forEach((input) => {
  input.value = localStorage.getItem(input.id);
});

const validations = {
  authorInput: [
    {
      condition: (value) => value.length >= 4,
      errorMsgId: "authorInputError1",
      isInputValid:
        JSON.stringify(localStorage.getItem("authorInputError1")) || false,
    },
    {
      condition: (value) => value.trim().split(/\s+/).length >= 2,
      errorMsgId: "authorInputError2",
      isInputValid:
        JSON.parse(localStorage.getItem("authorInputError2")) || false,
    },
    {
      condition: (value) => /^[ა-ჰ\s]+$/u.test(value),
      errorMsgId: "authorInputError3",
      isInputValid:
        JSON.parse(localStorage.getItem("authorInputError3")) || false,
    },
  ],
  headerInput: [
    {
      condition: (value) => value.length >= 2,
      errorMsgId: "headerInputError",
      isInputValid:
        JSON.parse(localStorage.getItem("headerInputError")) || false,
    },
  ],
  aboutInput: [
    {
      condition: (value) => value.length >= 2,
      errorMsgId: "aboutInputError",
      isInputValid:
        JSON.parse(localStorage.getItem("aboutInputError")) || false,
    },
  ],
  emailInput: [
    {
      condition: (value) =>
        value.endsWith("@redberry.ge") || value.length === 0,
      errorMsgId: "emailInputError",
      isInputValid:
        JSON.parse(localStorage.getItem("emailInputError")) || false,
    },
  ],
};

//check all validations for sbmt btn

function areAllInputsValid(validations) {
  return Object.keys(validations).every((inputKey) =>
    validations[inputKey].every((validation) => validation.isInputValid)
  );
}

if (areAllInputsValid(validations)) {
  submitBtn.disabled = false;
} else {
  submitBtn.disabled = true;
}

function validateInput(input) {
  const inputValue = document.getElementById(input).value;

  localStorage.setItem(input, inputValue);

  validations[input].forEach((validation) => {
    const validationSpan = document.getElementById(validation.errorMsgId);
    if (validation.condition(inputValue)) {
      if (
        document.getElementById(input).id === "emailInput" &&
        inputValue.length === 0
      ) {
        validationSpan.style.display = "none";
      }
      validationSpan.classList.add("span-valid");
      validationSpan.classList.remove("span-error");
      validation.isInputValid = true;
      localStorage.setItem(validation.errorMsgId, JSON.stringify(true));
    } else {
      if (
        document.getElementById(input).id === "emailInput" &&
        inputValue.length > 0
      ) {
        validationSpan.style.display = "block";
      }
      validationSpan.classList.add("span-error");
      validationSpan.classList.remove("span-valid");
      validation.isInputValid = false;
      localStorage.setItem(validation.errorMsgId, JSON.stringify(false));
    }
  });

  if (areAllInputsValid(validations)) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

// Image input

const dragArea = document.querySelector(".image-input-div");
const imgSuccess = document.querySelector(".img-input-success");
const imgSuccessSpan = document.querySelector("#imgSuccessSpan");
const deleteImg = document.getElementById("deleteImg");

var selectedFiles = [];
imageUrl = localStorage.getItem("imageURL");
selectedFiles.push(imageUrl);

if(imageUrl) {
  imgSuccess.style.display = "block";
  dragArea.style.display = "none";
}
//validate image input
function validateImg(){
  if(imageUrl.length === 0 || !areAllInputsValid(validations)){
  submitBtn.disabled = true;
  }
}
validateImg()


deleteImg.addEventListener("click", () => {
  localStorage.setItem("imageURL", "");
  imgSuccess.style.display = "none";
  dragArea.style.display = "block";
  
});

dragArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dragArea.style.background = "#F1EFFB";
});

dragArea.addEventListener("dragleave", () => {
  dragArea.style.background = "#F4F3FF";
});

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();

  var files = event.dataTransfer.files;

  if (files.length > 0) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var imageUrl = e.target.result;
      localStorage.setItem("imageURL", imageUrl);
    };
    reader.readAsDataURL(files[0]);
  }
  imgSuccess.style.display = "block";
  dragArea.style.display = "none";
}

function openFileInput() {
  var fileInput = document.getElementById("fileInput");
  fileInput.click();
}

function handleFileSelection(files) {
  selectedFiles = [];

  selectedFiles.push(files[0]);

  if (selectedFiles) {
    var reader = new FileReader();

    reader.onload = function (e) {
      localStorage.setItem("imageURL", e.target.result);
    };

    reader.readAsDataURL(selectedFiles[0]);
  }
  imgSuccess.style.display = "block";
  dragArea.style.display = "none";
}

// create categories input
// validate
// validation color to localstorage
