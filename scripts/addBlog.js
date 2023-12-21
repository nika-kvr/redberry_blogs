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
const validations = {
    'authorInput': [
        {
            condition: value => value.length >= 4,
            errorMsgId: 'authorInputError1'
        },
        {
            condition: value => value.trim().split(/\s+/).length >= 2,
            errorMsgId: 'authorInputError2'
        },
        {
            condition: value => /^[ა-ჰ\s]+$/u.test(value),
            errorMsgId: 'authorInputError3'
        }
    ],
    'headerInput': [
        {
            condition: value => value.length >= 2,
            errorMsgId: 'headerInputError'
        }
    ],
    'aboutInput': [
        {
            condition: value => value.length >= 2,
            errorMsgId: 'aboutInputError'
        }
    ],
    'emailInput': [
        {
            condition: value => value.endsWith('@redberry.ge'),
            errorMsgId: 'emailInputError'
        }
    ]
};

function validateInput(input) {
    const inputValue = document.getElementById(input).value;

    validations[input].forEach(validation => {
        const validationSpan = document.getElementById(validation.errorMsgId);
        if(validation.condition(inputValue)){
            validationSpan.style.color = "#14D81C";
        }else{
            validationSpan.style.color = "#EA1919";
        }
    });
}