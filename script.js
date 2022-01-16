const regForm = document.querySelector('#regForm');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const output = document.querySelector('#value-output');


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
// const editsignature = (e) => {

//     signatures.forEach(user => {
//         if(user.id === e.target.parentNode.parentElement.id){
//             user.firstName = firstName.textContent;
//         }
//     })

//     //  signatures.forEach(user => {
//     //       if(user.id === e.target.parentNode.parentElement.id){
//     //           signatures.firstName = firstName.textContent;
              
//     //       }
//     //       )}
//     // const edit = 
//     // signatures.user = firstName.textContent;
//     // user.firstName = firstName.textContent;
//     // user.email = email.value.textContent;

//     //  firstName.value = user[0].textContent;
//     //  lastName.value = user[1].textContent;
//     //  email.value = user[2].textContent;
//     //  button.textContent = 'SPARA';
// }

let signatures = [];

const addSignature = () => {
    output.innerHTML = '';

    signatures.forEach(user => {
        output.innerHTML += `
        <div class="box" id="${user.id}">
        <div>
            <div class="name">
                <h4 class="value-name">${user.firstName}</h4>
                <h3 class="value-name">${user.lastName}</h3>
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
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    }
    
})




output.addEventListener('click', e => {
    
    if(e.target.parentElement.id === 'btn-delete') {
        signatures = signatures.filter(user => user.id !== e.target.parentNode.parentElement.id);
        addSignature();
    }
    else if (e.target.parentElement.id === 'btn-edit') {
        {
            for(let i = 0; i < signatures.length; i++){
                signatures[i] = validate(user[i])
            }
        }
        
        addSignature();

        // LIKA SOM DEN DELETE

        // signatures.map(user => user.id === e.target.parentNode.parentElement.id)
    
    //  signatures.forEach(user => {
    //       if(user.id === e.target.parentNode.parentElement.id){
    //           signatures.firstName = firstName.textContent;
              
    //       }
          
    //       )}

        // user.firstName = firstName.value.textContent;
        // user.lastName = lastName.value.textContent,
        // user.email = email.value.textContent
        // Element.setAttribute(firstName,value)

        // user.value = firstName.value.textContent;
        // lastName.value = lastName.value.textContent;
        // email.value = email.value.textContent;
        // firstName.value = firstName.textContent;
        //  editsignature();
        
    }
})

