$('#hamburger').click(() => {
    $('#hamburger').toggleClass('fa-bars fa-xmark open');
    $('#nav').toggleClass('open');
})

$('.log-out-btn').click(() => {
    logOut();
})

const checkIfLoggedIn = () => {
    const userInfo = JSON.parse(sessionStorage.getItem('user'));
    if(userInfo){
        hideNotLoggedInSection();
        showLendBookForm();
        showLogoutBtn();
        $('#logged-in-user').text(`Inloggad som ${userInfo.username}`);
        document.querySelectorAll('.login-profile-links').forEach(link => {
            link.href = '/frontend/profile/profile.html';
            link.innerText = 'Gå till profil';
        })
    }
    else{
        hideLogoutBtn();
    }
}

const logOut = () => {
    sessionStorage.clear();
    checkIfLoggedIn();
    window.location.href = '/frontend/index.html';
}

const showLendBookForm = () => {
    $('#lending-book-section').removeClass('hide');
}
const hideNotLoggedInSection = () => {
    $('#not-logged-in-section').addClass('hide');
}

const showLogoutBtn = () => {
    $('#log-out-btn').removeClass('hide');
}
const hideLogoutBtn = () => {
    $('#log-out-btn').addClass('hide');
}
const getUserById = async (id) => {
    let {data} = await axios.get(`http://localhost:1337/api/users/${id}`);
    return data
}

checkIfLoggedIn();


