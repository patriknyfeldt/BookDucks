const queryString = new URLSearchParams(location.search);
const qsType = queryString.get('type'); 

$(`#lend-book-form`).submit((e) => {
    e.preventDefault();
    const image = $(`#image-input`).prop(`files`);
    if(image.length === 0){
      $(`.chosen-image`).addClass('img-missing');
      $(`#chosen-image-text`).text(`Du måste välja en bild`);
    }
    else{
      const title = $(`#title-input`).val();
      const author = $(`#author-input`).val();
      const rating = +$(`#rating-input`).val();
      const releaseDate = $(`#date-input`).val();
      const genres = [...document.querySelectorAll(`.genre-input:checked`)].map(genre => +genre.value);
      const length = qsType === 'books'? +$(`#pages-input`).val(): +`${$('#hours-input').val()}.${$('#minutes-input').val()}`
      const lengthFormat = qsType === 'books'? 'numberOfPages': 'duration';    
      const imgData = new FormData();
      imgData.append('files', image[0])
      addBook(imgData, title, author, rating, releaseDate, genres, length, lengthFormat)
    }
  })

  const uploadImage = async (imgData) => {
    const imgResponse = await axios.post("http://localhost:1337/api/upload", imgData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    return imgResponse.data[0].id;
  }

  const addBook = async (imgData, title, author, rating, releaseDate, genres, length, lengthFormat) => {
    const imageId = await uploadImage(imgData);
    await axios.post(`http://localhost:1337/api/${qsType}`, {
      data: {
       title,
       author,
       rating,
       releaseDate,
       genres,
       [lengthFormat]: length,
       coverImage: imageId,
       userId: +JSON.parse(sessionStorage.getItem('user')).id,
      }
    },
    {
      headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    window.location.href = './lending-books.html';
  }

  
const start = () => {
    if(qsType){
        $(`#${qsType}-link`).removeClass('green-btn');
        $(`#${qsType}-link`).addClass('blue-btn');
        $(`#lend-book-form`).removeClass('hide');
        const bookType = qsType === `books`? `bokens: `: `ljudbokens: `;
        $(`#form-heading`).text(`Fyll i ${bookType}`);
        $(`#length-box`).html(drawLengthBoxInnerHtml());
    }
    else{
      $(`#go-to-profile-btn`).removeClass('green-btn')
      $(`#go-to-profile-btn`).addClass('blue-btn');
      $(`#go-to-profile-label`).addClass('blue-label');
    }
}

$(`#image-input`).change((e) => {
    const {name} = e.target.files[0];
    $(`.chosen-image`).removeClass('img-missing');
    $(`#chosen-image-text`).text(`${name}`);
})

start();