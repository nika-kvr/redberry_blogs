// Validate logged in User
if (!localStorage.getItem("loggedInUser")) {
  window.location.href = "index.html";
}

// Select buttons
const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

function returnToHomePage(){
  window.location.href = "index.html";
}

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
            // isCategoryProvided()
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
            // isCategoryProvided()
          }
        } else {
          const selectedCategories = $("#selectedCategories");
          selectedCategories.append(newCategorie);
          selectedCategoriesarr.push(category.id);
          localStorage.setItem("categoriesArray", selectedCategoriesarr);
          // isCategoryProvided()
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
      // isCategoryProvided()
    });
    selectedcont.appendChild(newDiv);
    // isCategoryProvided()
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
        JSON.parse(localStorage.getItem("emailInputError")) || true,
    },
  ],
  dateInput: [
    {
      condition: (value) => value.length > 0,
      errorMsgId: "dateInputError",
      isInputValid: localStorage.getItem("dateInput") || false,
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
  submitBtn.classList.add('enabled-btn')
  submitBtn.classList.remove('disabled-btn')

} else {
  submitBtn.disabled = true;
  submitBtn.classList.remove('enabled-btn')
  submitBtn.classList.add('disabled-btn')
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
      if (document.getElementById(input).id === "dateInput"){
        true
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

  if (areAllInputsValid(validations) ) {
    submitBtn.disabled = false;
    submitBtn.classList.add('enabled-btn')
    submitBtn.classList.remove('disabled-btn')
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.remove('enabled-btn')
    submitBtn.classList.add('disabled-btn')
  }
}

// Image input

let formData = new FormData();

function dragOverHandler(event) {
  // Prevent default behavior to allow drop
  event.preventDefault();
}

function dropHandler(event) {
  // Prevent default behavior to open as a link
  event.preventDefault();

  // Get the dropped files
  const files = event.dataTransfer.files;

  // Handle the dropped files
  handleFileSelection(files);
}

function openFileUploader() {
  // Trigger the hidden file input
  const fileInput = document.getElementById('fileInput');
  fileInput.click();
}

const hideUploadShowPreview = (imageFile) => {
  document.getElementById('imagePreviewWrapper').classList.add('shown')
  document.getElementById('imgSuccessSpan').innerText = imageFile.name
  document.getElementById('dropZone').style.display = 'none'
}

function showUploadHidePreview() {
  document.getElementById('imagePreviewWrapper').classList.remove('shown')
  document.getElementById('imgSuccessSpan').innerText = " "
  document.getElementById('dropZone').style.display = 'flex'
  const imageItem = localStorage.getItem('imageURL')
  if (imageItem)
  {
    localStorage.setItem('imageURL', '')
    // fileUploadValidation(false)
  }
}
function handleFileSelection(files) {
  // Check if there's at least one file
  if (files.length > 0) {
    const imageFile = files[0];

    // Check if the dropped file is an image
    if (imageFile.type.startsWith('image/')) {

      const previewImage = document.getElementById('previewImage');
      const reader = new FileReader();

      hideUploadShowPreview(imageFile)

      reader.onload = function (e) {
        previewImage.src = e.target.result;

        formData.set('image', imageFile);

        localStorage.setItem('imageURL', e.target.result);
        
      };


      reader.readAsDataURL(imageFile);
    } else {
      alert('Please drop an image file.');
    }
  }
}

function triggerFileInput() {
  const fileInput = document.getElementById('fileInput');
  fileInput.click();
}

window.addEventListener('load', () => {
  const fileData = localStorage.getItem('imageURL');

  if (fileData) {
    const previewImage = document.getElementById('previewImage');
    previewImage.src = fileData;

    // Save image data in formData if not already set
    if (!formData.has('image')) {
      const byteCharacters = atob(fileData.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });
      const fileOptions = { type: 'image/png' };
      const file = new File([blob], 'BlogImg.JPEG', fileOptions);

      hideUploadShowPreview(file)
      formData.set('image', file);
      
    }
  }
});


function fileUploadValidation(hasImage){
  document.getElementById("submitButton").disabled = hasImage !== true;
}



// Post request
function submitForm(e) {
  e.preventDefault();

  function isFormValid(){
    var imageItem = localStorage.getItem('imageURL')
    if(imageItem && selectedCategoriesarr.length > 0){
      return true
    }else{
      return false
    }
  }
  if(isFormValid()){
    // Append other form fields to formData
    formData.append("title", document.getElementById("headerInput").value);
    formData.append("description", document.getElementById("aboutInput").value);
    formData.append("author", document.getElementById("authorInput").value);
    formData.append("publish_date", document.getElementById("dateInput").value);
    formData.append("categories", JSON.stringify(selectedCategoriesarr));
    formData.append("email", document.getElementById("emailInput").value);
  
    // Use the fetch API for the POST request
    var settings = {
      url: "https://api.blog.redberryinternship.ge/api/blogs",
      method: "POST",
      timeout: 0,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer 146644a0ab655270543c3ac7e23a7fdd660c1c1bba6e7a4b06613ed2af94cec0",
      },
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: formData,
    };
  
    $.ajax(settings).done(function (response) {
      if(response === undefined){
        console.log('daiposta')
        localStorage.clear();
        localStorage.setItem('loggedInUser', 'user');
        const modal = document.getElementById("blogModal");
        modal.showModal()
      }
    });
  }
  if(!localStorage.getItem('imageURL')){
    document.getElementById('dropZone').style.border ='2px dashed #EA1919';
  }

  if(selectedCategoriesarr.length === 0){
    document.getElementById('categoriesContainerDiv').style.borderColor = '#EA1919';
  }
}
