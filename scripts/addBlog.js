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
    newDiv.textContent = selectedDiv.textContent + " x";
    newDiv.classList.add("selected-categories");
    var computedStyle = getComputedStyle(selectedDiv);
    var backgroundColor = computedStyle.backgroundColor;
    newDiv.style.backgroundColor = backgroundColor;
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


//validate image input



var formData = new FormData();


//Post request
function submitForm(e) {
  e.preventDefault();

  // Append other form fields to formData
  formData.append('title', document.getElementById('headerInput').value);
  formData.append('description', document.getElementById('aboutInput').value);
  formData.append('author', document.getElementById('authorInput').value);
  formData.append('publish_date', document.getElementById('dateInput').value);
  formData.append('categories', JSON.stringify(selectedCategoriesarr));
  formData.append('email', document.getElementById('emailInput').value);

  // Use the fetch API for the POST request
  var settings = {
    url: "https://api.blog.redberryinternship.ge/api/blogs",
    method: "POST",
    timeout: 0,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer ed3851e0be618ff44a295b70142460b78bbf203358b051bf6c101791e84f077e",
    },
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: formData,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}

// create categories input
// validate
// validation color to localstorage
