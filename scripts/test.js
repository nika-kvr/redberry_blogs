// script.js
const validations = {
    'authorInput': [
        {
            condition: value => /^[ა-ჰ\s]+$/u.test(value),
            errorMessage: 'Author must contain only Georgian characters.'
        },
        {
            condition: value => value.trim().split(/\s+/).length >= 2,
            errorMessage: 'Author must have at least two words.'
        }
    ],
    'headerInput': [
        {
            condition: value => value.length >= 4,
            errorMessage: 'Header must be at least 4 characters long.'
        }
    ]
};

function validateInput(fieldName, value) {
    const errorElement = document.getElementById(fieldName + 'Error');

    for (const validation of validations[fieldName]) {
        if (!validation.condition(value)) {
            errorElement.textContent = validation.errorMessage;
            errorElement.style.color = 'red'; // Set error message color to red
            return false;
        }
    }

    errorElement.textContent = 'Valid';
    errorElement.style.color = 'green'; // Set error message color to green
    return true;
}

function validateForm() {
    for (const fieldName in validations) {
        const inputElement = document.getElementById(fieldName);
        const inputValue = inputElement.value;

        validateInput(fieldName, inputValue);
    }

    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = !isFormValid();
}

function isFormValid() {
    for (const fieldName in validations) {
        const errorElement = document.getElementById(fieldName + 'Error');
        if (errorElement.style.color === 'red') {
            return false; // If any error is red, the form is not valid
        }
    }
    return true; // All errors are green, form is valid
}

function submitForm() {
    // Your form submission logic goes here
    alert('Form submitted successfully!');
}
