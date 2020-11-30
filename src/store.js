import { map } from 'jquery';
import gen from './generatePages.js';
import api from './api.js';

  const bookmarks = [];
  let expanding = false;
  const filtered = [];
  let adding= false;
  let error= null;
  let filter = 0;


  function addBookmark(bookmark){
    bookmarks.push(bookmark);
  }

  function removeBookmark(id){
    for(let i = 0; i< this.bookmarks.length; i++){
      if(this.bookmarks[i].id === id){
        this.bookmarks.splice(i,1);
      }
    }
    this.filtered = this.bookmarks;    
  }

  function ratingFilter(filter){
    if(filter === 0){
      this.filtered = this.bookmarks;
    } else{
      this.filtered= [];
      for(let i = 0; i< this.bookmarks.length; i++){
        if(this.bookmarks[i].rating >= filter){
          this.filtered.splice(i,1,bookmarks[i]);
        }
      }
    }
  }

  function setError(error) {
    this.error = error;
  };

  

export default {bookmarks,ratingFilter,filtered,removeBookmark,adding,expanding, addBookmark, setError,filter,error};