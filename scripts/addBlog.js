// Select button

const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
})


// Image input

const dragArea = document.querySelector(".image-input-div");
var selectedFiles = [];
selectedFiles.push(localStorage.getItem('imageURL'));



dragArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dragArea.style.background = "#F1EFFB";
});

dragArea.addEventListener("dragleave", () => {
    dragArea.style.background = "#F4F3FF";
});

dragArea.addEventListener("drop", (event) => {
    event.preventDefault();
    selectedFiles = [];
    selectedFiles = event.dataTransfer.files[0];
    console.log('Selected Files:', selectedFiles);
});

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

    console.log('Selected Files:', selectedFiles);
}

//