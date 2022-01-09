const form = document.getElementById('regForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');

form.addEventListener('SKRIV UNDER', (e) => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    //get the values from the inputs
    const firstNameValue = firstName.value.trim();
    const lastName = lastName.value.trim();
    const email = email.value.trim();

    if(firstNameValue === '') {
        //show error 
        // add error class
        setErrorFor(firstName, 'Skriv in ditt förnamn.');
    }else {
        //add success class
        setSuccessFor(firstName);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement; //form-control
    const errorMessage = formControl.querySelector('p');

    // add error message inside p
    small.innerText = message;

    //add error class
    formControl.className = 'form-control error';
}