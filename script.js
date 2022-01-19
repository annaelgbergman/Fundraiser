const regForm = document.querySelector('#regForm');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const output = document.querySelector('#value-output');
const sign = document.querySelector('.sign');






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

    if (signatures.some(user => user.email === email.value)){
        setError(email, 'E-postaddressen är upptagen. Prova en annan')
        return false;
    }
    else if (email.value.trim() === '') {
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

let signatures = [];

const addSignature = () => {
    output.innerHTML = '';

    signatures.forEach(user => {
        output.innerHTML += `
        <div class="box" id="${user.id}">
        <div>
            <div class="name">
                <h4 class="value-name">${user.firstName.toLowerCase()}</h4>
                <h3 class="value-name">${user.lastName.toLowerCase()}</h3>
            </div>
            <p class="value-email">${user.email}</p>
        </div>
        <button class="btn-value edit" id="btn-edit"><i class="fas fa-pen"></i></button>
        <button class="btn-value delete" id="btn-delete"><i class="fas fa-times"></i></button>
       </div>
        `   

    })
}


regForm.addEventListener('submit', e => {
    e.preventDefault();

    errors = []

    for(let i = 0; i < regForm.length; i++) {
        errors[i] = validate(regForm[i])
    }

    if(!errors.includes(false)) {
    const user = {
        id: Date.now().toString(),
        firstName : firstName.value,
        lastName : lastName.value,
        email : email.value
    }
    console.log(user)
    signatures.push(user)
    addSignature();
    regForm.reset();

    firstName.parentElement.classList.remove('success');
    lastName.parentElement.classList.remove('success');
    email.parentElement.classList.remove('success');
}
})


output.addEventListener('click', e => {
    const boxId = e.target.parentNode.parentElement.id;

    if(e.target.parentElement.id === 'btn-delete') {
        signatures = signatures.filter(user => user.id !== boxId);
        addSignature();
    }
    else if (e.target.parentElement.id === 'btn-edit'){

        signatures.forEach(user => {
            if(user.id === boxId){
                firstName.value = user.firstName;
                lastName.value = user.lastName;
                email.value = user.email;  
            }
        })
        
        sign.classList.add('d-none')
        
        let button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'save');
        button.innerText = 'SPARA';
        
        let buttons = document.querySelector('.buttons');
        buttons.appendChild(button);
        
        button.addEventListener('click', () => addEditSignature(boxId, button))
    }
})

function addEditSignature (id, button){
        for (const currentUser of signatures) {
            if(currentUser.id === id){
                currentUser.firstName = firstName.value
                currentUser.lastName = lastName.value
                currentUser.email = email.value
            }
        }
        addSignature();
        button.remove();
        regForm.reset();
        sign.classList.remove('d-none')
        console.log(signatures);

}

