const regForm = document.querySelector('#regForm');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');


const validateText = (input) => {
    if (input.value.trim() === '') {
        setError(input, 'Du måste fylla i ditt namn')
        return false;
    }
    else if (input.value.trim().length < 2) {
        setError(input, 'Du måste ange minst två tecken')
        return false;
    }
    else {
        setSuccess(input)
        return true;
    }
}
const validateEmail = email => {
    let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (email.value.trim() === '') {
        setError(email, 'Du måste ange en e-postadress')
        return false;
    }
    else if (!regEx.test(email.value)) {
        setError(email, 'E-postadressen är inte giltig')
        return false;
    }
    else {
        setSuccess(email)
        return true;
    }
}


const setError = (input, textMessage) => {
    const parent = input.parentElement;
    parent.classList.add('error');
    parent.classList.remove('success');
    parent.querySelector('.invalid-input').innerText = textMessage;
}
const setSuccess = input => {
    const parent = input.parentElement;
    parent.classList.remove('error');
    parent.classList.add('success');
}


const validate = input => {
    switch(input.type){
        case 'text': return validateText(input)
        case 'email': return validateEmail(input)

        default:
            break;
    }
}


regForm.addEventListener('submit', e => {
    e.preventDefault();

    errors = []

    for(let i = 0; i < regForm.length; i++) {
        errors[i] = validate(regForm[i])
    }
    console.log(errors)

    if(!errors.includes(false)) {
    const user = {
        id: Date.now().toString(),
        firstName : firstName.value,
        lastName : lastName.value,
        email : email.value
    }
        console.log(user);
    }
    

})

