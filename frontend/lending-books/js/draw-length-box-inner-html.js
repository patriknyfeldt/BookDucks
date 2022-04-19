const drawLengthBoxInnerHtml = () => {
    if(qsType === 'audio-books'){
         return `<fieldset id="audio-books-length" class="audio-book-field">
        <legend>Längd:</legend>
        <div class="number-input-wrapper">
          <div class="small-box">
            <input
              id="hours-input"
              class="form-input number-input"
              type="number"
              min="1"
              required
            />
            <label class="form-label" for="hours-input">h</label>
          </div>
        </div>
        <div class="number-input-wrapper">
          <div class="small-box">
            <input id="minutes-input" class="form-input number-input" type="number" min="1" max="59" required/>
            <label class="form-label" for="minutes-input">min</label>
          </div>
        </div>
        </fieldset>`
    }
    else{
        return `<div id="books-length" class="number-input-wrapper">
        <label class="form-label" for="pages-input">Antal sidor:</label>
        <input class="form-input number-input" id="pages-input" type="number" min="1" required/>
      </div>`
    }
}
