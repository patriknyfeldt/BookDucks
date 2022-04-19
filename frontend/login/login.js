const loginErrorMsg = $('#login-error-msg');
const registerErrorMsg = $('#register-error-msg');

$('#login-form').submit((e) => {
    e.preventDefault();
    loginErrorMsg.text('');
    const username = $('#login-username-input').val();
    const password = $('#login-password-input').val();
    login(username, password);
    document.querySelectorAll('#login-form input').forEach(input => input.value = "");
})

$('#register-form').submit((e) => {
    e.preventDefault();
    registerErrorMsg.text('');
    const username = $('#register-username-input').val();
    const email = $('#register-email-input').val();
    const password = $('#register-password-input').val();
    const repeatPassword = $('#repeat-password-input').val();
    !email.split('@')[1].includes('.')? registerErrorMsg.text('Kontrollera att mejladressen är korrekt'):
    password !== repeatPassword? registerErrorMsg.text('Kontrollera att lösenorden stämmer överens'):
    createAccount(username, email, password);
})

const login = async (username, password) => {
    try{
        const {data} = await axios.post("http://localhost:1337/api/auth/local",
        {
            identifier: username,
            password: password,
        })
        const token = data.jwt;
        const user = data.user;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
        checkIfLoggedIn();
        window.location.href = '/frontend/index.html';
    }
    catch(error){
        loginErrorMsg.text('Fel användarnamn eller lösenord, försök igen')
    }
}

const createAccount = async (username, email, password) => {
    try{
        await axios.post('http://localhost:1337/api/auth/local/register', {
            username,
            email,
            password
          })
         toggleForms();
    }
    catch(error){
        registerErrorMsg.text('Det verkar som att användarnamnet eller mejladressen är upptaget')
    }
      
}
$('.go-to-btns').click(() => {
    toggleForms();
})

const toggleForms = () => {
    $('.form-section').toggleClass('hide');
    loginErrorMsg.text('');
    registerErrorMsg.text('');
}

checkIfLoggedIn();
