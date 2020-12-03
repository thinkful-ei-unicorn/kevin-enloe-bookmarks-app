import gen from './generatePages.js';
import $ from 'jquery';
import api from './api';
import store from './store';

const handler = function () {
  handleBookmark();
  handleNewBookmark();
  handleCancel();
  handleFilter()
  handleRemoveBookmark();
  handleUnexpanding();
  handleNewBookmarkForm();
  handleCloseError();
}
function handleBookmark(){
  $('.bookmarkApp').on('click', '.listButton', event => {
    const id = getItemIdFromElement(event.currentTarget);
    store.expanding = true;
    for(let i = 0; i< store.filtered.length; i++){
      if(store.filtered[i].id == id){
        store.filtered[i].expanded = true;
      } else {
        store.filtered[i].expanded =false;
      }
    }
    gen.render();
    store.expanding =false;
  });
}

function handleUnexpanding(){
  $('.bookmarkApp').on('click', '.expanded', event => {
    const id = getItemIdFromElement(event.currentTarget);
    store.expanding = false;
    for(let i = 0; i< store.filtered.length; i++){
      if(store.filtered[i].id == id){
        store.filtered[i].expanded = false;
      }
    }
    gen.render();
  });
}

function handleFilter(){
  $('.bookmarkApp').on('change', '#filter',()=>{    
    store.filter = $( "#filter option:selected" ).val();
    store.ratingFilter(store.filter);
    gen.render();
  });
}

function handleNewBookmark(){
  $('.bookmarkApp').on('click','.newBookmark', ()=>{
    store.adding = true;
    gen.render();
  });
}

function handleCancel(){
  $('.bookmarkApp').on('click','.cancelButton',()=>{
    store.adding = false;
    gen.render();
  });
}

function handleRemoveBookmark(){
  $('.bookmarkApp').on('click', '.removeBookmark',event=>{
    const id = getItemIdFromExpandedElement(event.currentTarget);
    api.removeBookmark(id).then(()=>{
      store.removeBookmark(id);
      gen.render();
    })
    .catch((error) => {
      console.log(error);
      store.setError(error.message);
      gen.renderError();
    });
  });
}

function handleCloseError(){
  $('.error-container').on('click', '#cancel-error', () => {
    store.setError(null);
    gen.renderError();
  });
}

function handleNewBookmarkForm(){
  $('.bookmarkApp').on('submit','.addNewBookmark',(event)=>{
    event.preventDefault();
    const newBookmark = $(event.currentTarget).serializeArray(); 
        
    api.createBookmark(newBookmark)
    .then(res => res.json())
    .then((newBookmark)=> {
      store.addBookmark(newBookmark);
      gen.render();
    })
    .catch((error) => {
      console.log(error);
      store.setError(error.message);
      gen.renderError();
    });
      store.adding = false;      
    });
}

const getItemIdFromExpandedElement = function (item) {
  return $(item)
    .closest('.moreInfo')
    .attr('id');
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.listButton')
    .attr('id');
};


export default {
  handler
};