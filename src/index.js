'use strict';
import $ from 'jquery';
import 'normalize.css';
import './index.css';
import gen from './generatePages.js';
import handle from './handlers.js';
import store from './store.js';
import api from './api.js';

function main(){
  api.getItems().then(res => res.json()).then((items) => {
    items.forEach((item) => store.addBookmark(item));
    gen.render();
  });

handle.handleBookmark();
handle.handleFilter();
handle.handleNewBookmark();
handle.handleCancel();
handle.handleRemoveBookmark();
handle.handleUnexpanding();
handle.handleNewBookmarkForm();
handle.handleCloseError();
}

$(main)