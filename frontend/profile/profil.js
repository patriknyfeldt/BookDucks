const user = JSON.parse(sessionStorage.getItem('user'));

$('#user-section').html(`
<div class="user-wrapper">
    <p>Användarnamn: ${user.username}</p>
    <p>Email: ${user.email}</p>
    <p>Id: ${user.id}</p>
    <p>Registrerad: ${user.createdAt.slice(0,10)}</p>
</div>
<button class="log-out-btn" onClick="logOut()">Logga ut</button>
`)

const getBooksFromSpecificUser = async (typeOfBook, activeUser) => {
    const {data} = await axios.get(`http://localhost:1337/api/${typeOfBook}?filters[userId][$eq]=${activeUser}&populate=*`);
    const books = data.data;
    renderBooks(books, typeOfBook, activeUser);
}
const start = () => {
    const typeOfBooks = ['books', 'audio-books'];
    typeOfBooks.forEach(type => getBooksFromSpecificUser(type, user.id));
}
start();


