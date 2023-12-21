// Validate logged in User
if(!localStorage.getItem('loggedInUser')){
    window.location.href = "index.html";
}


// Select buttons
const backBtn = document.getElementById("backBtn");


backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});


// Image input

const dragArea = document.querySelector(".image-input-div");
const imgSuccess = document.querySelector(".img-input-success");
const imgSuccessSpan = document.querySelector("#imgSuccessSpan");
const deleteImg = document.getElementById("deleteImg");

var selectedFiles = [];
imageUrl = localStorage.getItem('imageURL');
selectedFiles.push(imageUrl);


if(imageUrl){
    imgSuccess.style.display = "block";
    dragArea.style.display = "none";
}

deleteImg.addEventListener("click", () => {
    localStorage.setItem('imageURL', '');
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
        localStorage.setItem('imageURL', imageUrl);
        
      };
      reader.readAsDataURL(files[0]);
    }
    imgSuccess.style.display = "block";
    dragArea.style.display = "none";
}


function openFileInput(){
    var fileInput = document.getElementById('fileInput');
    fileInput.click();
}

function handleFileSelection(files) {
    selectedFiles = [];

    selectedFiles.push(files[0]);

    if (selectedFiles) {
        var reader = new FileReader();

        reader.onload = function (e) {
            localStorage.setItem('imageURL', e.target.result);
        };

        reader.readAsDataURL(selectedFiles[0]);
    }
    imgSuccess.style.display = "block";
    dragArea.style.display = "none";
}

// Validations  
const submitBtn = document.getElementById('submitButton');
const authorInput = document.getElementById('authorInput');


// get data from storage
const form = document.getElementById('myForm');
const inputElements = form.querySelectorAll('.input');
inputElements.forEach(input => {
    input.value = localStorage.getItem(input.id)
});

const validations = {
    'authorInput': [
        {
            condition: value => value.length >= 4,
            errorMsgId: 'authorInputError1',
            isInputValid: JSON.stringify(localStorage.getItem('authorInputError1')) || false
        },
        {
            condition: value => value.trim().split(/\s+/).length >= 2,
            errorMsgId: 'authorInputError2',
            isInputValid: JSON.parse(localStorage.getItem('authorInputError2')) || false
        },
        {
            condition: value => /^[ა-ჰ\s]+$/u.test(value),
            errorMsgId: 'authorInputError3',
            isInputValid: JSON.parse(localStorage.getItem('authorInputError3')) || false
        }
    ],
    'headerInput': [
        {
            condition: value => value.length >= 2,
            errorMsgId: 'headerInputError',
            isInputValid: JSON.parse(localStorage.getItem('headerInputError')) || false
        }
    ],
    'aboutInput': [
        {
            condition: value => value.length >= 2,
            errorMsgId: 'aboutInputError',
            isInputValid: JSON.parse(localStorage.getItem('aboutInputError')) || false
        }
    ],
    'emailInput': [
        {
            condition: value => value.endsWith('@redberry.ge') || value.length === 0,
            errorMsgId: 'emailInputError',
            isInputValid: JSON.parse(localStorage.getItem('emailInputError')) || false
        }
    ]
};

//check all validations for sbmt btn


console.log(validations['emailInput'][0].isInputValid);

function areAllInputsValid(validations) {
    return Object.keys(validations).every(inputKey =>
        validations[inputKey].every(validation => validation.isInputValid)
    );
}

if(areAllInputsValid(validations)){
    submitBtn.disabled = false;
}else{
    submitBtn.disabled = true;
}



function validateInput(input) {
    const inputValue = document.getElementById(input).value;

    localStorage.setItem(input, inputValue)

    validations[input].forEach(validation => {
        const validationSpan = document.getElementById(validation.errorMsgId);
        if(validation.condition(inputValue)){
            if(document.getElementById(input).id ==='emailInput' && inputValue.length===0){
                validationSpan.style.display = "none";
            }
            validationSpan.classList.add('span-valid');
            validationSpan.classList.remove('span-error');
            validation.isInputValid = true;
            localStorage.setItem(validation.errorMsgId, JSON.stringify(true))
        }else{
            if(document.getElementById(input).id ==='emailInput' && inputValue.length>0){
                validationSpan.style.display = "block";
            }
            validationSpan.classList.add('span-error');
            validationSpan.classList.remove('span-valid');
            validation.isInputValid = false;
            localStorage.setItem(validation.errorMsgId, JSON.stringify(false))
        }
    });



    if(areAllInputsValid(validations)){
        submitBtn.disabled = false;
    }else{
        submitBtn.disabled = true;
    }
}

// create categories input
// validate 
// validation color to localstorage