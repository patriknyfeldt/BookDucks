const renderBooks = async (booksToRender, typeOfBook, onProfilePage) => {
    for (const book of booksToRender) {
        const {attributes, id} = book;
        const {url} = attributes.coverImage.data.attributes;
        const genres = attributes.genres.data;
        const lender = await getUserById(attributes.userId);
        drawBookArticles(attributes, url, genres, lender, id, typeOfBook, onProfilePage);
    }
}

const drawBookArticles = (attributes, url, genres, lender, id, typeOfBook, onProfilePage) => {
    $(`#${typeOfBook}-wrapper`).append(`<article class="book-article">
    <h4 class="book-title">${attributes.title}</h4>
    <div class="content">
        <div class="left-wrapper">
            <img class="book-img" src="http://localhost:1337${url}" alt="image of ${attributes.title}"></img>
        </div>
        <div class="right-wrapper">    
            <p>Författare: ${attributes.author}</p>
            <P>${typeOfBook === 'books'? `Sidor: ${attributes.numberOfPages}`: `Längd: ${attributes.duration.toString().split('.')[0]}h${attributes.duration.toString().split('.')[1]}min`}</p>
            <p>Utgivningsdatum: ${attributes.releaseDate}</p>
            <p>Betyg: ${attributes.rating}/5</p>
            <div class="genre-box" id="${typeOfBook}-genre-box-${id}">Genrer: ${genres.map(drawGenres)}</div>
            <p>Lånas ut av: ${lender.username}</p>
            <p>Email: ${lender.email}</p>
            <div class="delete-box" id="delete-box-${id}">
                ${onProfilePage? `<button class="delete-btn" onClick="deleteBook('${+id}','${typeOfBook}', '${attributes.title}')">Ta bort</button>`: ''}
            </div>
        </div>
    </div>    
</article>`)
}

const drawGenres = (genre) => `
<a href="/frontend/index.html?genre=${genre.attributes.name}">${genre.attributes.name}</a>`

const deleteBook = async (id, typeOfbook, title) => {
    if(confirm(`Är du säker på att du vill ta bort ${title}`)){
        await axios.delete(`http://localhost:1337/api/${typeOfbook}/${id}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        location.reload();
    }
    else return
}    




