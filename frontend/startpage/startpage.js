
const queryString = new URLSearchParams(location.search);
const qsGenre = queryString.get('genre'); 

const getBooks = async (typeOfBook) => {
    const {data} = await axios.get(`http://localhost:1337/api/${typeOfBook}?populate=*`);
    const books = data.data;
    renderBooks(books, typeOfBook);
}
const getBooksByGenre = async (typeOfBook, chosenGenre) => {
    const {data} = await axios.get(`http://localhost:1337/api/${typeOfBook}?populate=*`);
    const books = data.data;
    const booksToRender = books.filter(book => 
        book.attributes.genres.data.filter(genre => genre.attributes.name.includes(chosenGenre)).length > 0
    )
    renderBooks(booksToRender, typeOfBook);
}

const start = () => {
    const typeOfBooks = ['books', 'audio-books'];
    if(qsGenre){
        document.getElementById('books-heading').innerText = qsGenre;
        typeOfBooks.forEach(type => getBooksByGenre(type, qsGenre))
    }
    else typeOfBooks.forEach(type => getBooks(type));
}
   
start();
