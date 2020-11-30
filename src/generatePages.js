'use strict';
import $ from 'jquery';
import 'normalize.css';
import './index.css';
import store from './store.js'
const imgSize = `30`
const star1 = `<img src="./images/star.png" height="${imgSize}" width="${imgSize}">`;
const star2 = `<img src="./images/star.png" height="${imgSize}" width="${imgSize}"><img src="./images/star.png" height="${imgSize}" width="${imgSize}">`;
const star3 = `<img src="./images/star.png" height="${imgSize}" width="${imgSize}"><img src="./images/star.png" height="${imgSize}" width="${imgSize}"><img src="./images/star.png" height="${imgSize}" width="${imgSize}">`;
const star4 = `<img src="./images/star.png" height="${imgSize}" width="${imgSize}"><img src="./images/star.png" height="${imgSize}" width="${imgSize}"><img src="./images/star.png" height="${imgSize}" width="${imgSize}"><img src="./images/star.png" height="${imgSize}" width="${imgSize}">`;
const star5 = `<img src="./images/star.png" height="${imgSize}" width="${imgSize}"><img src="./images/star.png" height="${imgSize}" width="${imgSize}"><img src="./images/star.png" height="${imgSize}" width="${imgSize}"><img src="./images/star.png" height="${imgSize}" width="${imgSize}"><img src="./images/star.png" height="${imgSize}" width="${imgSize}">`;

function render() {
  store.ratingFilter(store.filter);
  renderError();
  if(store.adding===true){
    generateAddBookmarkPage();
  } else if(store.expanding === true){
    for(let i = 0; i < store.filtered.length; i++){
      if(store.filtered[i].expanded === true){
        generateDetailedPage(store.filtered[i].id);
      }
    } 
  } else {
    generateMainPage();
  }
}


function generateMainPage() {
  let list = '';
  let topMainPage = `
  <div class="bookmarks-notexpanded">
  <h2>My Bookmarks</h2>
  <div class="buttons">
  <button class="newBookmark">
    <span class="newBookmark">+ New</span>
  </button>

  <form>
    <fieldset>
      <legend>Filter</legend>
      <p>
        <select id="filter">
          <option value="0">Filter</option>
          <option value="1">1 Stars and Above</option>
          <option value="2">2 Stars and Above</option>
          <option value="3">3 Stars and Above</option>
          <option value="4">4 Stars and Above</option>
          <option value="5">5 Stars</option>
        </select>
      </p>
    </fieldset>
  </form>
</div>
<div class="bookmarksList">
      <ul>`
  let currentStar = ``;
  for (let i = 0; i < store.filtered.length; i++) {
    switch (store.filtered[i].rating) {
      case 1:
        currentStar = star1;
        break;
      case 2:
        currentStar = star2;
        break;
      case 3:
        currentStar = star3;
        break;
      case 4:
        currentStar = star4;
        break;
      case 5:
        currentStar = star5;
        break;
    }
    list += `
    
        <li>       
          <button class="listButton" id="${store.filtered[i].id}">
            <span class="title">${store.filtered[i].title}</span>
            <p>${currentStar}</p>
          </button>
          
        </li>
        
  `
  }

  let bottomMainPage = `
      </ul>
    </div>
  </div>
`
  let mainPage = topMainPage + list + bottomMainPage;
  $('.bookmarkApp').html(mainPage);
}


function generateDetailedPage(id) {
  let list = '';
  let topMainPage = `
  <div class="bookmarks-notexpanded">
  <h2>My Bookmarks</h2>
  <div class="buttons">
  <button class="newBookmark">
    <span class="newBookmark">+ New</span>
  </button>

  <form>
    <fieldset>
      <legend>Filter</legend>
      <p>
        <select id="filter">
          <option value="0">Filter</option>
          <option value="1">1 Stars and Above</option>
          <option value="2">2 Stars and Above</option>
          <option value="3">3 Stars and Above</option>
          <option value="4">4 Stars and Above</option>
          <option value="5">5 Stars</option>
        </select>
      </p>
    </fieldset>
  </form>
</div>
<div class="bookmarksList">
      <ul>`
  let currentStar = ``;
  for (let i = 0; i < store.filtered.length; i++) {
    switch (store.filtered[i].rating) {
      case 1:
        currentStar = star1;
        break;
      case 2:
        currentStar = star2;
        break;
      case 3:
        currentStar = star3;
        break;
      case 4:
        currentStar = star4;
        break;
      case 5:
        currentStar = star5;
        break;
    }
    if(store.filtered[i].id === id){
      list +=`
      <li>
          <button class="expanded" id="expanded">
            <span class="title">${store.filtered[i].title}</span>
            <span>${currentStar}</span>
          </button>
          <div class="moreInfo" id = "${store.filtered[i].id}">
            <div class="infoHeader">
            <a href="${store.filtered[i].url}"><button class="visitSite" id="visitSite">
            <span class="visitSite">Visit Site</span>
            </button></a>
              <h3>${currentStar}</h3>
              <button class = "removeBookmark" id ="remove"><img src = "./images/trash.png" height = "50" width="50"></button>
            </div>
            <p>${store.filtered[i].desc}</p>
          </div>
        </li>
        `
    } else {
      list += `
        <li>
          <button class="listButton" id="${store.filtered[i].id}">
            <span class="title">${store.filtered[i].title}</span>
            <span>${currentStar}</span>
          </button>
        </li>
  `
    }
  }

  let bottomMainPage = `
      </ul>
    </div>
  </div>
`
  let mainPage = topMainPage + list + bottomMainPage;
  $('.bookmarkApp').html(mainPage);
}


function generateAddBookmarkPage(){
  let page = `
  <div class="bookmarks-notexpanded">
  <h2>My Bookmarks</h2>

    <form class="addNewBookmark">
      <p>Add New Resource:</p>
      <div>
        <input type="text" name="title" class = "title" placeholder="Name">
      </div>
      <div>
        <input type="text" name="URL" class ="url" placeholder="URL" required>
      </div>
      

      <div>
        <input type="radio" id="rating1" name="rating" value="1" required>
        <label for="rating"><img src="./images/star.png" height="40" width="40"></label>
        <input type="radio" id="rating2" name="rating" value="2" required>
        <label for="rating"><img src="./images/star.png" height="40" width="40"><img src="./images/star.png" height="40"
            width="40"></label>
        <input type="radio" id="rating3" name="rating" value="3" required>
        <label for="rating"><img src="./images/star.png" height="40" width="40"><img src="./images/star.png" height="40"
            width="40"><img src="./images/star.png" height="40" width="40"></label>
        <input type="radio" id="rating4" name="rating" value="4" required>
        <label for="rating"><img src="./images/star.png" height="40" width="40"><img src="./images/star.png" height="40"
            width="40"><img src="./images/star.png" height="40" width="40"><img src="./images/star.png" height="40"
            width="40"></label>
        <input type="radio" id="rating5" name="rating" value="5" required>
        <label for="rating"><img src="./images/star.png" height="40" width="40"><img src="./images/star.png" height="40"
            width="40"><img src="./images/star.png" height="40" width="40"><img src="./images/star.png" height="40"
            width="40"><img src="./images/star.png" height="40" width="40"></label>
      </div>
      <div>
        <textarea name="description" class="message" placeholder="Description"></textarea>
        <br>
        
        <input type="submit">
    </form>
    
  </div>
  <div class = 'cancel'>
    <button class="cancelButton" id="cancel">
      <span class="cancelButton">Cancel</span>
    </button>
    </div>
  </div>
  `
  $('.bookmarkApp').html(page);
}

function generateError(message){
  return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
};

function renderError(){
  if (store.error) {
    const el = generateError(store.error);
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
}

export default {
  generateMainPage,
  generateDetailedPage,
  generateAddBookmarkPage,
  render,
  renderError
};